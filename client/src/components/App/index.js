import React, { Component } from 'react';
import './style.css';

import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';

import Dropzone from 'react-dropzone';
import { ControlLabel, Modal } from 'react-bootstrap';
import UploadModal from '../UploadModal';

import * as dataUtil from '../../utils/data';
import * as config from '../../utils/config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = config.initialState.App;
    this.handleSaveItem2 = this.handleSaveItem2.bind(this);
    this.updateTreeStructure2 = this.updateTreeStructure2.bind(this);
  }

  componentDidMount() {
    dataUtil
      .fetchAllDataForApp(config.routes)
      .then(dataUtil.createInitialEntityState)
      .then(data => {
        this.setState({
          ...data,
          treeData: dataUtil.createTreeView({
            data: { ...data },
            entities: config.entities
          })
        });
      })
      .catch(console.error);
  }

  toggleImageModal = () => {
    this.setState({
      showImageModal: !this.state.showImageModal
    });
  };

  addConversation = () => {
    if (this.state.itemEditing === null) {
      dataUtil
        .post(config.routes.conversation.create, {
          ...config.initialState[config.entities.conversation]
        })
        .then(res => res.json())
        .then(res => {
          const conversation = res[config.entities.conversation];

          this.setState(
            {
              itemEditing: conversation[conversation.length - 1],
              ...res
            },
            () => {
              this.setState({
                entitiesCanCopyTo: dataUtil.getEntitiesCanCopyTo(
                  this.state.itemEditing,
                  this.state
                ),
                treeData: dataUtil.createTreeView({
                  data: { ...this.state },
                  entities: config.entities
                })
              });
            }
          );
        })
        .catch(console.error);
    }
  };

  resetActionMessage = (stateKey, time) => {
    setTimeout(() => this.setState({ [stateKey]: '' }), time);
  };

  addImage = (acceptedFiles, rejectedFiles) => {
    const data = new FormData();
    data.append('file', acceptedFiles[0]);

    fetch(
      '/images/create',
      config.http.makeUploadFetchOptions({
        method: 'POST',
        body: data
      })
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          image: this.state.image.concat(res),
          imageUploadStatus: 'success',
          showImageModal: false
        });

        this.resetActionMessage('imageUploadStatus', 4000);
      })
      .catch(e => {
        console.error(e);

        this.setState({
          imageUploadStatus: 'fail'
        });

        this.resetActionMessage('imageUploadStatus', 4000);
      });
  };

  handleUpdatingItem = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      itemEditing: {
        ...this.state.itemEditing,
        [target.name]: value
      },
      itemHasBeenEdited: true
    });
  };

  handleUpdateMessageOptions = ({ field, value }) => {
    this.setState({
      itemEditing: {
        ...this.state.itemEditing,
        [field]: value
      },
      itemHasBeenEdited: true
    });
  };

  markPosition = entity => {
    if (
      entity.parent.type !== config.entities.conversation &&
      entity.parent.type !== config.entities.block
    ) {
      return entity;
    }

    if (!this.state.childEntities.length) {
      return {
        ...entity,
        start: true
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
          {
            [entity.type]: res,
            childEntities: this.state.childEntities.concat(res[res.length - 1])
          },
          () => {
            this.setState({
              treeData: dataUtil.createTreeView({
                data: { ...this.state },
                entities: config.entities
              }),
              entitiesCanCopyTo: dataUtil.getEntitiesCanCopyTo(
                this.state.itemEditing,
                this.state
              )
            }, () => !!(callback) && callback(res[res.length - 1]));
          }
        );
      })
      .catch(console.error);
  };

  handleUpdateChildEntity = ({ index, field, value }) => {
    const newArray = Array.from(this.state.childEntities);
    newArray[index][field] = value;

    this.setState({
      childEntities: newArray
    });
  };

  updateTreeStructure = () => {
    this.setState({
      treeData: dataUtil.createTreeView({
        data: { ...this.state },
        entities: config.entities,
        active: (this.state.itemEditing || {}).id
      }),
      childEntities: dataUtil.getChildEntitiesFor(
        this.state.itemEditing,
        this.state
      ),
      entitiesCanCopyTo: dataUtil.getEntitiesCanCopyTo(
        this.state.itemEditing,
        this.state
      )
    });
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
            ...res
          };
          if (i.next && !uploadItem.next) { delete newRes.next; }
          return newRes;
        } else {
          return i;
        }
      });
    }
    let childEntities =  this.state.childEntities.map(c => (
      c.id === newRes.id ? newRes : c
    ));
    this.setState(
      {
        [res.type]: items,
        childEntities
      },
      () => this.updateTreeStructure2(newRes, callback)
    )
  }

  handleUploadNonMessage(res, uploadItem, callback) {
    let childEntities =  this.state.childEntities.map(c => {
      let found = res.find(r => c.id === r.id);
      return found ? found : c;
    });
    this.setState(
      {
        [uploadItem.type]: res,
        childEntities
      },
      () => this.updateTreeStructure2(uploadItem, callback)
    );
  }

  handleSaveItem2(item, callback) {
    const route = item.id ? config.operations.update : config.operations.create;
    dataUtil
      .post(
        config.routes[item.type][route],
        dataUtil.makeCopyAndRemoveKeys(item, config.keysToRemove)
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

  updateTreeStructure2(item, callback) {
    this.setState({
      treeData: dataUtil.createTreeView({
        data: { ...this.state },
        entities: config.entities,
        active: (item || {}).id
      })/*,
      childEntities: dataUtil.getChildEntitiesFor(
        item,
        this.state
      ),/*
      entitiesCanCopyTo: dataUtil.getEntitiesCanCopyTo(
        item,
        this.state
      )*/
    }, () => !!(callback) && callback(item));
  }

  handleSaveItem = ({ item, reset, switchTo }) => {
    const route = item.id ? config.operations.update : config.operations.create;

    dataUtil
      .post(
        config.routes[item.type][route],
        dataUtil.makeCopyAndRemoveKeys(item, config.keysToRemove)
      )
      .then(res => res.json())
      .then(dataUtil.throwIfEmptyArray)
      .then(res => {
        this.setState(
          {
            itemEditing: reset
              ? null
              : switchTo ? res[res.length - 1] : this.state.itemEditing,
            [item.type]: res
          },
          this.updateTreeStructure
        );
      })
      .catch(console.error);
  };

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

  handleCopyItem = ({ parent }) => {
    const route = config.operations.copy;

    dataUtil
      .post(config.routes[parent.type][route], {
        parent: dataUtil.makeCopyAndRemoveKeys(parent, config.keysToRemove)
      })
      .then(res => res.json())
      .then(copiedResults => {
        this.setState(copiedResults, () => {
          this.setState({
            treeData: dataUtil.createTreeView({
              data: { ...this.state },
              entities: config.entities,
              active: (this.state.itemEditing || {}).id
            })
          });
        });
      })
      .catch(console.error);
  };

  handleDeleteItem = item => {
    const route = config.operations.delete;
    dataUtil
      .post(config.routes[item.type][route], item)
      .then(res => res.json())
      .then(dataUtil.constructEntityState(item.type))
      .then(nextEntityState => {
        this.setState(
          {
            itemEditing: null,
            childEntities: [],
            entitiesCanCopyTo: [],
            ...nextEntityState
          },
          () => {
            this.setState({
              treeData: dataUtil.createTreeView({
                data: { ...this.state },
                entities: config.entities
              })
            });
          }
        );
      })
      .catch(console.error);
  };

  handleEditingChildEntity = entity => {
    this.setState(
      {
        itemEditing: entity,
        itemHasBeenEdited: false
      },
      () => {
        this.setState({
          childEntities: dataUtil.getChildEntitiesFor(
            this.state.itemEditing,
            this.state
          ),
          entitiesCanCopyTo: dataUtil.getEntitiesCanCopyTo(
            this.state.itemEditing,
            this.state
          ),
          treeData: dataUtil.createTreeView({
            data: { ...this.state },
            entities: config.entities,
            active: this.state.itemEditing.id
          })
        });
      }
    );
  };

  handleDashboardClose = () => {
    this.state.cursor.active = false;

    this.setState(
      {
        itemEditing: null,
        itemHasBeenEdited: false,
        childEntities: []
      },
      () => {
        this.setState({
          entitiesCanCopyTo: [],
          treeData: dataUtil.createTreeView({
            data: { ...this.state },
            entities: config.entities
          })
        });
      }
    );
  };

  handleTreeToggle = ({ node, expand }) => {
    /* eslint-disable react/no-direct-mutation-state */

    if (expand) {
      if (node.children) {
        node.toggled = !node.toggled;
      }

      this.setState({
        cursor: node
      });

      return;
    }

    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;

    this.setState(
      {
        cursor: node,
        itemEditing: node.type ? node : this.state.itemEditing,
        itemHasBeenEdited: false
      },
      () => {
        this.setState({
          childEntities: dataUtil.getChildEntitiesFor(
            this.state.itemEditing,
            this.state
          ),
          entitiesCanCopyTo: dataUtil.getEntitiesCanCopyTo(
            this.state.itemEditing,
            this.state
          )
        });
      }
    );
  };

  handleCopyEntity = () => {
    const parent = {
      ...this.state.itemEditing
    };

    this.handleCopyItem({
      parent
    });
  };

  handleCopyToEntity = entity => {
    const parent = {
      ...this.state.itemEditing,
      parent: {
        ...entity.link
      }
    };

    this.handleCopyItem({
      parent
    });
  };
  render() {
    return (
      <div className="App row">
        <UploadModal
          isOpen={false}
          onHide={() => null}
          onUpload={() => null}
        />
        <Modal
          show={this.state.showImageModal}
          onHide={this.toggleImageModal}
          dialogClassName="custom-modal"
        >
          <span className={`alert ${this.state.imageUploadStatus}`}>
            {`image upload ${this.state.imageUploadStatus}`.toUpperCase()}
          </span>

          <ControlLabel>Drag and Drop Image Below To Upload</ControlLabel>
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={this.addImage}
            className={`custom-dropzone ${this.state.imageUploadStatus}`}
          />
        </Modal>

        <Sidebar
          addImage={this.addImage}
          addConversation={this.addConversation}
          conversation={this.state.conversation}
          treeData={this.state.treeData}
          handleTreeToggle={this.handleTreeToggle}
          itemEditing={this.state.itemEditing}
          toggleImageModal={this.toggleImageModal}
        />

        <Dashboard
          formConfig={config.forms}
          handleClose={this.handleDashboardClose}
          handleUpdateItem={this.handleUpdatingItem}
          handleSaveItem={this.handleSaveItem}
          handleSaveItem2={this.handleSaveItem2}
          handleDeleteItem={this.handleDeleteItem}
          handleNewChildEntity={this.handleNewChildEntity}
          handleUpdateChildEntity={this.handleUpdateChildEntity}
          handleEditingChildEntity={this.handleEditingChildEntity}
          handleUpdateMessageOptions={this.handleUpdateMessageOptions}
          handleAddTag={this.handleAddTag}
          itemEditing={this.state.itemEditing}
          itemHasBeenEdited={this.state.itemHasBeenEdited}
          childEntities={this.state.childEntities}
          entitiesCanCopyTo={this.state.entitiesCanCopyTo}
          handleCopyEntity={this.handleCopyEntity}
          handleCopyToEntity={this.handleCopyToEntity}
          images={this.state.image}
          tags={this.state.tag}
        />
      </div>
    );
  }
}

export default App;
