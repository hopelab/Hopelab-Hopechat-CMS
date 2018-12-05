import React, { Component } from 'react';
import { pick, omit, isEmpty, isNil, equals, find, propEq, uniq } from 'ramda';

import './style.css';

import Loader from '../common/Loader';

import Sidebar from '../Sidebar';
import AssetLibrary from '../AssetLibrary';
import Dashboard from '../Dashboard';
import UploadModal from '../UploadModal';
import Modal from '../common/Modal';
import StudyIdView from '../StudyIdView';


import * as dataUtil from '../../utils/data';
import * as config from '../../utils/config';

import { DASHBOARD_COMPONENTS, IS_QUICK_REPLY_RETRY, STOP_MESSAGE_ID, CRISIS_BLOCK_ID, END_OF_CONVO_ID,
  IS_STOP_MESSAGE_DETECTION, QUICK_REPLY_BLOCK_ID, QUICK_REPLY_BLOCK_NAME, RESUME_MESSAGE_ID,
  IS_CRISIS_RESPONSE_DETECTION, IS_END_OF_CONVERSATION } from '../../utils/constants';

const { MESSAGE_TYPE_VIDEO, TYPE_BLOCK } = config;
const { cleanString, copyOrder } = dataUtil;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = config.initialState.App;
    this.handleSaveItem = this.handleSaveItem.bind(this);
    this.updateStartEntity = this.updateStartEntity.bind(this);
    this.handleCopyEntity = this.handleCopyEntity.bind(this);
    this.handleCopyItem = this.handleCopyItem.bind(this);
    this.handleTreeToggle = this.handleTreeToggle.bind(this);
  }

  componentWillMount() {
    this.toggleView();
  }

  componentDidMount() {
    dataUtil
      .fetchAllDataForApp(config.routes)
      .then(dataUtil.createInitialEntityState)
      .then(data => {
        this.setState({ ...data, initialLoad: false });
      })
      .catch(console.error);
  }

  toggleImageModal = () => {
    this.setState({
      showImageModal: !this.state.showImageModal,
    });
  };

  addConversation = () => {
    this.setState({ loading: true });
    dataUtil
      .post(config.routes.conversation.create, {
        ...config.initialState[config.entities.conversation],
      })
      .then(res => res.json())
      .then(res => {
        const conversation = res[config.entities.conversation];
        this.setState({
          loading: false,
          itemEditing:
              pick(['id', 'type'], conversation[conversation.length - 1]),
          ...res,
        });
      })
      .catch(console.error);
  };

  resetActionMessage = (stateKey, time) => {
    setTimeout(() => this.setState({ [stateKey]: '' }), time);
  };

  addImage = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles) {
      this.setState({ loading: true });
      const data = new FormData();
      data.append('file', acceptedFiles[0]);

      fetch(
        '/media/create',
        config.http.makeUploadFetchOptions({
          method: 'POST',
          body: data,
        }),
      )
        .then(res => res.json())
        .then(res => {
          const newState = {
            loading: false,
            imageUploadStatus: 'success',
            mediaUpload: {
              ...this.state.mediaUpload,
              showModal: false,
            },
          };

          const media = { key: res.key, url: res.url };

          if (res.type === 'image') {
            newState.image = this.state.image.concat(media);
          } else {
            newState.video = this.state.video.concat(media);
          }

          this.setState(newState);

          this.resetActionMessage('imageUploadStatus', 4000);
        })
        .catch(e => {
          console.error(e);
          this.setState({
            imageUploadStatus: 'fail',
          });

          this.resetActionMessage('imageUploadStatus', 4000);
        });
    } else if (rejectedFiles) {
      console.error(JSON.stringify(rejectedFiles));
    }
  };

  getFullItemEditing(state) {
    const { itemEditing, view } = state;
    switch (view) {
      case DASHBOARD_COMPONENTS.quickReply:
        return {
          id: QUICK_REPLY_BLOCK_ID,
          type: TYPE_BLOCK,
          name: QUICK_REPLY_BLOCK_NAME,
        };
      case DASHBOARD_COMPONENTS.crisis:
        return {
          id: CRISIS_BLOCK_ID,
          type: TYPE_BLOCK,
          name: 'Crisis Detection',
        };
      case DASHBOARD_COMPONENTS.stop:
        return {
          id: 'stop-parent-id',
          type: TYPE_BLOCK,
          name: 'Stop Detection',
        };
      case DASHBOARD_COMPONENTS.eoc:
        return {
          id: 'end-of-conversation-parent-id',
          type: TYPE_BLOCK,
          name: 'Stop Detection',
        };
      default:
        if (!itemEditing) {
          return null;
        }
        return state[itemEditing.type].find(item => item.id === itemEditing.id);
    }
  }

  markPosition = entity => {
    if (
      entity.parent.type !== config.entities.conversation &&
      entity.parent.type !== config.entities.block
    ) {
      return entity;
    }

    const childEntities = dataUtil.getChildEntitiesFor(
      this.getFullItemEditing(this.state),
      this.state,
    );

    if (!childEntities.length) {
      return {
        ...entity,
        start: true,
      };
    }

    return entity;
  };

  handleNewChildEntity = (entity, callback, addedFromIndex) => {
    this.setState({ loading: true });
    dataUtil
      .post(config.routes[entity.type].create, this.markPosition(entity))
      .then(res => res.json())
      .then(dataUtil.throwIfEmptyArray)
      .then(res => {
        const addedItem = res
          .filter(({ parent: { id } = {}, created }) => (id === entity.parent.id && created))
          .sort((a, b) => (a.created < b.created ? 1 : -1))[0];
        const itemEditing = this.getFullItemEditing(this.state);
        const data = omit(['loading'], this.state);

        const childEntities = dataUtil.getChildEntitiesFor(
          itemEditing,
          data,
        );
        const order = this.getOrdering({ id: itemEditing.id, childEntities });
        this.changeOrder({
          id: addedItem.id,
          newIndex: !isNil(addedFromIndex) ? addedFromIndex + 1 : order.length,
          itemEditing,
          isNew: true,
        });

        this.setState(
          {
            [entity.type]: res,
            loading: false,
          },
          () => !!(callback) && callback(addedItem),
        );
      })
      .then(() => this.setOrder)
      .catch(console.error);
  };

  handleUploadMessage(res, uploadItem, callback) {
    let items;
    let newRes;
    if (!uploadItem.id) {
      throw new Error('Handle the create new case!');
    } else {
      items = this.state[res.type].map(i => {
        if (i.id === res.id) {
          newRes = {
            ...i,
            ...res,
          };
          if (i.next && !uploadItem.next) { delete newRes.next; }
          if (i.delayInMinutes && !uploadItem.delayInMinutes) {
            delete newRes.delayInMinutes;
          }
          return newRes;
        }
        return i;
      });
    }
    this.setState(
      { [res.type]: items },
      () => !!(callback) && callback(uploadItem),
    );
  }

  handleUploadNonMessage(res, uploadItem, callback) {
    this.setState(
      { [uploadItem.type]: res },
      () => !!(callback) && callback(uploadItem),
    );
  }

  handleSaveItem(item, callback) {
    const { itemEditing, conversation } = this.state;
    this.setState({ loading: true });
    let affectedConversation;
    if (!equals(item.isLive, itemEditing.isLive)) {
      if (item.isLive) {
        // meaning we need to make some item 'notLive'
        affectedConversation = find(propEq('isLive', true))(conversation);
      }
    }
    const route = item.id ? config.operations.update : config.operations.create;
    dataUtil
      .post(
        config.routes[item.type][route],
        dataUtil.makeCopyAndRemoveKeys(item, config.keysToRemove),
      )
      .then(res => res.json())
      .then(res => {
        if (affectedConversation) {
          this.handleSaveItem({ ...affectedConversation, isLive: false });
        } else {
          this.setState({ loading: false });
          if (Array.isArray(res)) {
            this.handleUploadNonMessage(res, item, callback);
          } else {
            this.handleUploadMessage(res, item, callback);
          }
        }
      })
      .catch(console.error);
  }

  handleCopyEntity(entity) {
    const itemToCopy = entity ? {
      ...this.state.itemEditing,
      parent: {
        ...entity.link,
      },
    } : {
      ...this.state.itemEditing,
    };

    this.handleCopyItem({
      itemToCopy,
    });
  }

  handleCopyItem({ itemToCopy }) {
    const route = config.operations.copy;
    this.setState({ loading: true });

    dataUtil
      .post(config.routes[itemToCopy.type][route], {
        parent: dataUtil.makeCopyAndRemoveKeys(itemToCopy, config.keysToRemove),
      })
      .then(res => res.json())
      .then(copiedResults => {
        const created = copiedResults[itemToCopy.type]
          .filter(a => a.created)
          .sort((a, b) => (a.created < b.created ? 1 : -1))[0];
        if (created && config.forms[itemToCopy.type].children.length) {
          const data = omit(['loading'], copiedResults);

          const oldChildEntities = dataUtil.getChildEntitiesFor(
            itemToCopy,
            data,
          );
          const newChildEntity = dataUtil.getChildEntitiesFor(
            created,
            data,
          );
          const oldOrder = this.getOrdering(itemToCopy);
          const ordering = copyOrder(oldOrder, oldChildEntities, newChildEntity);
          this.saveOrdering({ ordering, id: created.id }, false);
        }
        this.setState({ ...copiedResults, loading: false });
      })
      .catch(console.error);
  }

  deleteMedia(url, type) {
    this.setState({ loading: true });
    const urlArray = url.split('/');
    const fullName = urlArray[urlArray.length - 1];
    const affectedMsg = this.state.message.find(m => (equals(m.url, url)));
    fetch(
      `/media/delete/${fullName}/${type}`,
      config.http.makeUploadFetchOptions({
        method: 'GET',
      }),
    )
      .then(res => res.json())
      .then(val => {
        this.setState({ [type]: val });
        if (affectedMsg) {
          this.handleSaveItem({ ...affectedMsg, url: null });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  renameMedia(newName, url, type) {
    const encodedName = cleanString(newName);
    const urlArray = url.split('/');
    const fileName = urlArray[urlArray.length - 1];
    const displayName = fileName.split('.')[0];
    const newUrl = url.replace(displayName, encodedName);
    const repl = this.state[type].map(i =>
      (equals(i.url, url) ?
        { ...i, url: newUrl, key: encodedName } : i));
    const affectedMsg = this.state.message.find(m => (equals(m.url, url)));
    this.setState({ loading: true });
    fetch(
      `/media/rename/${encodedName}/${fileName}`,
      config.http.makeUploadFetchOptions({
        method: 'GET',
      }),
    )
      .then(() => {
        this.setState({ [type]: repl });
        if (affectedMsg) {
          this.handleSaveItem({ ...affectedMsg, url: newUrl });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  handleDeleteItem = itemToDelete => {
    this.setState({ itemToDelete, openDeleteModal: !this.state.openDeleteModal });
  }

  handleDeleteConfirm = item => {
    this.setState({ loading: true, openDeleteModal: false });
    const route = config.operations.delete;
    dataUtil
      .post(config.routes[item.type][route], item)
      .then(res => res.json())
      .then(dataUtil.constructEntityState(item.type))
      .then(nextEntityState => {
        let newState = { loading: false };
        const itemEditing = this.getFullItemEditing(this.state);
        this.changeOrder({ id: item.id, itemEditing, isDelete: true });
        if (this.state.itemEditing && item.id === this.state.itemEditing.id) {
          newState = {
            ...newState,
            itemEditing: null,
            ...nextEntityState,
          };
        } else {
          newState = { ...newState, ...nextEntityState };
        }
        this.setState(newState);
      })
      .catch(console.error);
  };

  handleTreeToggle({ node: pNode, expand }) {
    this.toggleView();
    const node = pNode;
    if (expand) {
      if (node.children) {
        node.toggled = !node.toggled;
      }

      this.setState({
        cursor: node,
      });

      return;
    }

    node.active = true;

    this.setState({
      cursor: node,
      itemEditing: node.type ? pick(['id', 'type'], node) : this.state.itemEditing,
    });
  }

  updateStartEntity(entity, oldEntity) {
    const { collection, message } = this.state;
    dataUtil.updateStart(entity, oldEntity).then(data => {
      this.setState({
        message: data.messages ? data.messages : message,
        collection: data.collections ? data.collections : collection,
      });
    });
  }

  toggleView(view) {
    let component;
    switch (view) {
      case DASHBOARD_COMPONENTS.studyIds:
        if (!this.state.studyIds) {
          this.loadStudyIds();
        }
        component = <StudyIdView />;
        break;
      case DASHBOARD_COMPONENTS.assets:
        component = <AssetLibrary />;
        break;
      default:
        component = <Dashboard />;
        break;
    }
    this.setState({ component, view });
  }

  toggleReadOnly() {
    const { readOnly } = this.state;
    this.setState({ readOnly: !readOnly });
  }

  loadStudyIds() {
    fetch('/study/all').then(res => {
      res.json().then(studyIds => {
        this.setState({ studyIds: uniq(studyIds) });
      });
    });
  }

  getOrdering(item) {
    const { orders } = this.state;
    const order = orders.find(orderList => orderList.id === item.id) ||
      this.createOrder(item);
    return order.ordering;
  }

  createOrder({ id, childEntities }) {
    const sorted = childEntities.sort((a, b) => ((a.created < b.created) ? -1 : 1)).map(({ id: cid }) => cid);
    const ordering = { id, ordering: sorted };
    this.saveOrdering(ordering);
    return ordering;
  }

  saveOrdering(ordering, setLoad) {
    if (setLoad) this.setState({ loading: true });
    dataUtil
      .post(
        config.routes[config.entities.orders].create,
        ordering,
      ).then(res => res.json()).then(orders => this.setState({ orders, loading: false }));
  }

  changeOrder({ id, newIndex, itemEditing, isNew, isDelete }) {
    this.setState({ loading: true });
    const oldOrder = this.getOrdering({ id: itemEditing.id });
    const oldIndex = oldOrder.indexOf(id);
    const ordering = oldOrder.slice(0);
    if (!isNew) ordering.splice(oldIndex, 1);
    if (!isDelete) ordering.splice(newIndex + (newIndex < oldIndex ? 1 : 0), 0, id);
    dataUtil
      .post(
        config.routes[config.entities.orders].update,
        { ordering, id: itemEditing.id },
      ).then(res => res.json()).then(data => {
        const orders = this.state.orders.map(o => (o.id === data.id ? { ...data } : o));
        this.setState({ orders, loading: false });
      });
  }

  getMainProps() {
    const { studyIds, conversation, image, video, readOnly, view, message, collection } = this.state;
    const data = omit(['loading'], this.state);
    const itemEditing = this.getFullItemEditing(this.state);

    const entitiesCanCopyTo = dataUtil.getEntitiesCanCopyTo(
      itemEditing,
      this.state,
    );

    const childEntities = dataUtil.getChildEntitiesFor(
      itemEditing,
      data,
    );

    let mainProps = {
      setNewIndex: ({ id, newIndex }) => this.changeOrder({ id, newIndex, itemEditing }, true),
      formConfig: config.forms,
      handleSaveItem: this.handleSaveItem,
      handleDeleteItem: this.handleDeleteItem,
      handleNewChildEntity: this.handleNewChildEntity,
      itemEditing,
      childEntities,
      conversations: conversation,
      entitiesCanCopyTo,
      handleCopyEntity: this.handleCopyEntity,
      images: image,
      videos: video,
      updateStartEntity: this.updateStartEntity,
      readOnly,
      toggleReadOnly: () => this.toggleReadOnly(),
      order: itemEditing ? this.getOrdering({ id: itemEditing.id, childEntities }) : null,
      messages: message.concat(collection),
    };
    switch (view) {
      case DASHBOARD_COMPONENTS.studyIds:
        mainProps = { ...mainProps, studyIds };
        break;
      case DASHBOARD_COMPONENTS.assets:
        mainProps = {
          ...mainProps,
          assets: image.concat(video.map(v => ({ ...v, type: MESSAGE_TYPE_VIDEO })))
            .sort((a, b) => (a.modifiedAt > b.modifiedAt ? -1 : 1)),
          toggleImageModal: () => {
            this.setState({
              mediaUpload: {
                ...this.state.mediaUpload,
                showModal: !this.state.mediaUpload.showModal,
              },
            });
          },
          deleteMedia: (url, type) => this.deleteMedia(url, type),
          renameFile: (newName, oldName, type) => this.renameMedia(newName, oldName, type),
        };
        break;
      case DASHBOARD_COMPONENTS.quickReply:
        mainProps = {
          ...mainProps,
          order: this.getOrdering({ id: QUICK_REPLY_BLOCK_ID }),
          config: config.forms.conversation,
          special: IS_QUICK_REPLY_RETRY,
          updateStartEntity: Function.prototype,
        };
        break;
      case DASHBOARD_COMPONENTS.crisis:
        mainProps = {
          ...mainProps,
          order: this.getOrdering({ id: CRISIS_BLOCK_ID }),
          config: config.forms.conversation,
          special: IS_CRISIS_RESPONSE_DETECTION,
          updateStartEntity: Function.prototype,
        };
        break;
      case DASHBOARD_COMPONENTS.stop:
        mainProps = {
          ...mainProps,
          order: [STOP_MESSAGE_ID, RESUME_MESSAGE_ID],
          config: config.forms.conversation,
          special: IS_STOP_MESSAGE_DETECTION,
          updateStartEntity: Function.prototype,
        };
        break;
      case DASHBOARD_COMPONENTS.eoc:
        mainProps = {
          ...mainProps,
          order: [END_OF_CONVO_ID],
          config: config.forms.conversation,
          special: IS_END_OF_CONVERSATION,
          updateStartEntity: Function.prototype,
        };
        break;
      default:
        break;
    }
    return mainProps;
  }


  render() {
    const { loading, readOnly, openDeleteModal, itemToDelete, component, view, initialLoad } = this.state;
    const data = omit(['loading'], this.state);

    if (isEmpty(data) || initialLoad) return <Loader />;
    let itemEditing;
    if (!view) itemEditing = this.getFullItemEditing(this.state);

    const treeData = dataUtil.createTreeView({
      data,
      entities: config.entities,
      active: (itemEditing || {}).id,
    });


    return (
      <div className="App row darkblue-bg">
        <UploadModal
          isOpen={this.state.mediaUpload.showModal}
          onHide={() => this.setState({
            mediaUpload: {
              ...this.state.mediaUpload,
              showModal: false,
            },
          })}
          onUpload={this.addImage}
        />

        <Sidebar
          addConversation={this.addConversation}
          conversation={this.state.conversation}
          treeData={treeData}
          handleTreeToggle={this.handleTreeToggle}
          itemEditing={itemEditing}
          toggleView={newView => this.toggleView(newView)}
          readOnly={readOnly}
          selectedItem={view || (itemEditing ? itemEditing.id : '')}
        />
        {loading &&
          <div className="floating-loader">
            <Loader text={false} />
          </div>
        }

        {openDeleteModal &&
          <Modal
            header={<span>Delete <strong>{itemToDelete.name}</strong>?</span>}
            text={<span>Are you sure you want to delete this <strong>{itemToDelete.type}</strong>?</span>}
            onCancel={() => this.handleDeleteItem(null)}
            onConfirm={() => this.handleDeleteConfirm(itemToDelete)}
          />
        }

        {React.cloneElement(component, this.getMainProps())}
      </div>
    );
  }
}

export default App;
