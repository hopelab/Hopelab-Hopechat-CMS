import React, { Component } from 'react';
import { pick } from 'ramda';

import './style.css';

import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';
import UploadModal from '../UploadModal';

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
      .catch(err => { console.error(err); console.log('here instead'); });
  }

  toggleImageModal = () => {
    this.setState({
      showImageModal: !this.state.showImageModal,
    });
  };

  addConversation = () => {
    dataUtil
      .post(config.routes.conversation.create, {
        ...config.initialState[config.entities.conversation],
      })
      .then(res => res.json())
      .then(res => {
        const conversation = res[config.entities.conversation];
        this.setState({
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
    dataUtil
      .post(config.routes[entity.type].create, this.markPosition(entity))
      .then(res => res.json())
      .then(dataUtil.throwIfEmptyArray)
      .then(res => {
        this.setState(
          { [entity.type]: res },
          () => !!(callback) && callback(res[res.length - 1]),
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
    const route = item.id ? config.operations.update : config.operations.create;
    dataUtil
      .post(
        config.routes[item.type][route],
        dataUtil.makeCopyAndRemoveKeys(item, config.keysToRemove),
      )
      .then(res => res.json())
      .then(res => {
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

    dataUtil
      .post(config.routes[itemToCopy.type][route], {
        parent: dataUtil.makeCopyAndRemoveKeys(itemToCopy, config.keysToRemove),
      })
      .then(res => res.json())
      .then(copiedResults => {
        this.setState(copiedResults);
      })
      .catch(console.error);
  }

  handleDeleteItem = item => {
    const route = config.operations.delete;
    dataUtil
      .post(config.routes[item.type][route], item)
      .then(res => res.json())
      .then(dataUtil.constructEntityState(item.type))
      .then(nextEntityState => {
        let newState;
        if (this.state.itemEditing && item.id === this.state.itemEditing.id) {
          newState = {
            itemEditing: null,
            ...nextEntityState,
          };
        } else {
          newState = { ...nextEntityState };
        }
        this.setState(newState);
      })
      .catch(console.error);
  };

  handleTreeToggle = ({ node: pNode, expand }) => {
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

  updateStartEntity(entity) {
    dataUtil.updateStart(entity).then(data => {
      this.setState({
        message: data.messages,
        collection: data.collections,
      });
    });
  }

  render() {
    const entitiesCanCopyTo = dataUtil.getEntitiesCanCopyTo(
      this.getFullItemEditing(this.state),
      this.state,
    );

    const childEntities = dataUtil.getChildEntitiesFor(
      this.getFullItemEditing(this.state),
      this.state,
    );

    const treeData = dataUtil.createTreeView({
      data: { ...this.state },
      entities: config.entities,
      active: (this.getFullItemEditing(this.state) || {}).id,
    });

    const itemEditing = this.getFullItemEditing(this.state);

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
          toggleImageModal={() => {
            this.setState({
              mediaUpload: {
                ...this.state.mediaUpload,
                showModal: !this.state.mediaUpload.showModal,
              },
            });
          }}
        />

        <Dashboard
          formConfig={config.forms}
          handleSaveItem={this.handleSaveItem}
          handleDeleteItem={this.handleDeleteItem}
          handleNewChildEntity={this.handleNewChildEntity}
          handleAddTag={this.handleAddTag}
          itemEditing={itemEditing}
          childEntities={childEntities}
          conversations={this.state.conversation}
          entitiesCanCopyTo={entitiesCanCopyTo}
          handleCopyEntity={this.handleCopyEntity}
          images={this.state.image}
          videos={this.state.video}
          tags={this.state.tag}
          updateStartEntity={this.updateStartEntity}
        />
      </div>
    );
  }
}

export default App;
