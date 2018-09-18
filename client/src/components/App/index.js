import React, { Component } from 'react';
import { pick, omit, isEmpty } from 'ramda';

import './style.css';

import Loader from '../common/Loader';

import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';
import UploadModal from '../UploadModal';
import Modal from '../common/Modal';

import * as dataUtil from '../../utils/data';
import * as config from '../../utils/config';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = config.initialState.App;
    this.handleSaveItem = this.handleSaveItem.bind(this);
    this.updateStartEntity = this.updateStartEntity.bind(this);
    this.handleCopyEntity = this.handleCopyEntity.bind(this);
    this.handleCopyItem = this.handleCopyItem.bind(this);
  }

  componentDidMount() {
    dataUtil
      .fetchAllDataForApp(config.routes)
      .then(dataUtil.createInitialEntityState)
      .then(data => {
        this.setState({ ...data });
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
    this.setState({ loading: true });
    if (rejectedFiles) {
      console.error(JSON.stringify(rejectedFiles));
    }
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
  };

  getFullItemEditing(state) {
    const { itemEditing } = state;
    if (!itemEditing) {
      return null;
    }

    return state[itemEditing.type].find(item => item.id === itemEditing.id);
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

  handleNewChildEntity = (entity, callback) => {
    this.setState({ loading: true });
    dataUtil
      .post(config.routes[entity.type].create, this.markPosition(entity))
      .then(res => res.json())
      .then(dataUtil.throwIfEmptyArray)
      .then(res => {
        const addedItem = res.sort((a, b) => (a.created < b.created ? 1 : -1))[0];
        this.setState(
          {
            [entity.type]: res,
            loading: false,
          },
          () => !!(callback) && callback(addedItem),
        );
      })
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
    this.setState({ loading: true });
    const route = item.id ? config.operations.update : config.operations.create;
    dataUtil
      .post(
        config.routes[item.type][route],
        dataUtil.makeCopyAndRemoveKeys(item, config.keysToRemove),
      )
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false });
        if (Array.isArray(res)) {
          this.handleUploadNonMessage(res, item, callback);
        } else {
          this.handleUploadMessage(res, item, callback);
        }
      })
      .catch(console.error);
  }

  handleAddTag = tag => {
    if (dataUtil.tagExists(tag, this.state.tag)) {
      return;
    }

    dataUtil
      .post(config.routes[config.TYPE_TAG][config.operations.create], tag)
      .then(res => res.json())
      .then(res => {
        this.setState({ [config.TYPE_TAG]: res });
      })
      .catch(console.error);
  };

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
        this.setState({ ...copiedResults, loading: false });
      })
      .catch(console.error);
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

  handleTreeToggle = ({ node: pNode, expand }) => {
    this.setState({ showStudyIdView: false });
    /* eslint-disable react/no-direct-mutation-state */
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

    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;

    this.setState({
      cursor: node,
      itemEditing: node.type ? pick(['id', 'type'], node) : this.state.itemEditing,
    });
  };

  updateStartEntity(entity, oldEntity) {
    const { collection, message } = this.state;
    dataUtil.updateStart(entity, oldEntity).then(data => {
      this.setState({
        message: data.messages ? data.messages : message,
        collection: data.collections ? data.collections : collection,
      });
    });
  }

  toggleStudyIdView() {
    const { showStudyIdView } = this.state;
    if (!this.state.studyIds && !showStudyIdView) {
      this.loadStudyIds();
    }
    this.setState({ showStudyIdView: !showStudyIdView });
  }

  toggleReadOnly() {
    const { readOnly } = this.state;
    this.setState({ readOnly: !readOnly });
  }

  loadStudyIds() {
    fetch('/study/all').then(res => {
      res.json().then(studyIds => {
        this.setState({ studyIds });
      });
    });
  }

  render() {
    const { loading, readOnly } = this.state;
    const data = omit(['loading'], this.state);
    if (isEmpty(data)) return <Loader />;

    const entitiesCanCopyTo = dataUtil.getEntitiesCanCopyTo(
      this.getFullItemEditing(this.state),
      this.state,
    );

    const childEntities = dataUtil.getChildEntitiesFor(
      this.getFullItemEditing(data),
      data,
    );

    const treeData = dataUtil.createTreeView({
      data,
      entities: config.entities,
      active: (this.getFullItemEditing(this.state) || {}).id,
    });

    const itemEditing = this.getFullItemEditing(this.state);
    const { showStudyIdView, studyIds, conversation, image, video, tag, openDeleteModal, itemToDelete } = this.state;
    return (
      <div className="App row">
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
          toggleStudyIdView={() => this.toggleStudyIdView()}
          readOnly={readOnly}
          toggleImageModal={() => {
            this.setState({
              mediaUpload: {
                ...this.state.mediaUpload,
                showModal: !this.state.mediaUpload.showModal,
              },
            });
          }}
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

        <Dashboard
          formConfig={config.forms}
          handleSaveItem={this.handleSaveItem}
          handleDeleteItem={this.handleDeleteItem}
          handleNewChildEntity={this.handleNewChildEntity}
          handleAddTag={this.handleAddTag}
          itemEditing={itemEditing}
          childEntities={childEntities}
          conversations={conversation}
          entitiesCanCopyTo={entitiesCanCopyTo}
          handleCopyEntity={this.handleCopyEntity}
          images={image}
          videos={video}
          tags={tag}
          updateStartEntity={this.updateStartEntity}
          showStudyIdView={showStudyIdView}
          studyIds={studyIds}
          readOnly={readOnly}
          toggleReadOnly={() => this.toggleReadOnly()}
        />
      </div>
    );
  }
}

export default App;
