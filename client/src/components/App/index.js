import React, { Component } from 'react';
import './style.css';

import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';

import * as dataUtil from '../../utils/data';
import * as config from '../../utils/config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = config.initialState.App;
  }

  componentDidMount() {
    dataUtil
      .fetchAllDataForApp(config.routes)
      .then(data => {
        this.setState({
          ...dataUtil.createInitialEntityState(data),
          treeData: dataUtil.createTreeView(
            { ...dataUtil.createInitialEntityState(data) },
            config.entities
          )
        });
      })
      .catch(console.error);
  }

  addConversation = () => {
    if (this.state.itemEditing === null) {
      dataUtil
        .post(config.routes.conversation.create, {
          ...config.initialState[config.entities.conversation]
        })
        .then(res => res.json())
        .then(dataUtil.throwIfEmptyArray)
        .then(res => {
          this.setState({
            itemEditing: res[res.length - 1],
            [config.entities.conversation]: res
          });
        })
        .catch(console.error);
    }
  };

  handleUpdatingItem = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      itemEditing: {
        ...this.state.itemEditing,
        [target.name]: value
      }
    });
  };

  handleNewChildEntity = entity => {
    dataUtil
      .post(config.routes[entity.type].create, entity)
      .then(res => res.json())
      .then(dataUtil.throwIfEmptyArray)
      .then(res => {
        this.setState({
          childEntities: this.state.childEntities.concat(res[res.length - 1])
        });
      })
      .catch(console.error);
  };

  handleUpdateChildEntityName = (index, name) => {
    const newArray = Array.from(this.state.childEntities);
    newArray[index].name = name;

    this.setState({
      childEntities: newArray
    });
  };

  updateTreeStructure = () => {
    this.setState({
      treeData: dataUtil.createTreeView({ ...this.state }, config.entities),
      childEntities: dataUtil.getChildEntitiesFor(
        this.state.itemEditing,
        this.state
      )
    });
  };

  handleSaveItem = (item, reset) => {
    const route = item.id ? config.operations.update : config.operations.create;

    dataUtil
      .post(config.routes[item.type][route], item)
      .then(res => res.json())
      .then(dataUtil.throwIfEmptyArray)
      .then(res => {
        this.setState(
          {
            itemEditing: reset ? null : this.state.itemEditing,
            [item.type]: res
          },
          this.updateTreeStructure
        );
      })
      .catch(console.error);
  };

  handleDeleteItem = item => {
    const route = config.operations.delete;
    dataUtil
      .post(config.routes[item.type][route], item)
      .then(res => res.json())
      .then(dataUtil.throwIfEmptyArray)
      .then(res => {
        this.setState(
          {
            itemEditing: null,
            childEntities: [],
            [item.type]: res
          },
          () => {
            this.setState({
              treeData: dataUtil.createTreeView(
                { ...this.state },
                config.entities
              )
            });
          }
        );
      })
      .catch(console.error);
  };

  handleEditingChildEntity = entity => {
    this.setState(
      {
        itemEditing: entity
      },
      () => {
        this.setState({
          childEntities: dataUtil.getChildEntitiesFor(
            this.state.itemEditing,
            this.state
          )
        });
      }
    );
  };

  handleDashboardClose = () => {
    this.setState({
      itemEditing: null,
      childEntities: []
    });
  };

  handleTreeToggle = (node, toggled) => {
    /* eslint-disable react/no-direct-mutation-state */
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }

    this.setState(
      {
        cursor: node,
        itemEditing: node.type ? node : this.state.itemEditing
      },
      () => {
        this.setState({
          childEntities: dataUtil.getChildEntitiesFor(
            this.state.itemEditing,
            this.state
          )
        });
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          addConversation={this.addConversation}
          conversation={this.state.conversation}
          treeData={this.state.treeData}
          handleTreeToggle={this.handleTreeToggle}
        />

        <Dashboard
          formConfig={config.forms}
          handleClose={this.handleDashboardClose}
          handleUpdateItem={this.handleUpdatingItem}
          handleSaveItem={this.handleSaveItem}
          handleDeleteItem={this.handleDeleteItem}
          handleNewChildEntity={this.handleNewChildEntity}
          handleUpdateChildEntityName={this.handleUpdateChildEntityName}
          handleEditingChildEntity={this.handleEditingChildEntity}
          itemEditing={this.state.itemEditing}
          childEntities={this.state.childEntities}
        />
      </div>
    );
  }
}

export default App;
