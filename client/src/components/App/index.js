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
        .then(res => {
          this.setState({
            itemEditing: res[res.length - 1],
            [config.entities.conversation]: res
          });
        })
        .catch(console.error);
    }
  };

  handleSidebarItemClick = item => {
    if (this.state.itemEditing === null) {
      this.setState({
        itemEditing: item
      });
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
      .then(res => {
        this.setState({
          entitiesToAdd: this.state.entitiesToAdd.concat(res[res.length - 1])
        });
      })
      .catch(console.error);
  };

  handleUpdateChildEntityName = (index, name) => {
    const newArray = Array.from(this.state.entitiesToAdd);
    newArray[index].name = name;

    this.setState({
      entitiesToAdd: newArray
    });
  };

  updateTreeState = () => {
    this.setState({
      treeData: dataUtil.createTreeView({ ...this.state }, config.entities)
    });
  };

  handleSaveItem = (item, reset) => {
    const route = item.id ? 'update' : 'create';

    dataUtil
      .post(config.routes[item.type][route], item)
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            itemEditing: reset ? null : this.state.itemEditing,
            [item.type]: res
          },
          this.updateTreeState
        );
      })
      .catch(console.error);
  };

  handleDeleteItem = item => {
    const route = 'delete';
    dataUtil
      .post(config.routes[item.type][route], item)
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            itemEditing: null,
            [item.type]: res
          },
          this.updateTreeState
        );
      })
      .catch(console.error);
  };

  handleEditingChildEntity = entity => {
    this.setState({
      itemEditing: entity,
      entitiesToAdd: []
    });
  };

  handleDashboardClose = () => {
    this.setState({
      itemEditing: null
    });
  };

  handleTreeToggle = (node, toggled) => {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }

    this.setState({
      cursor: node,
      itemEditing: node.type ? node : this.state.itemEditing,
      entitiesToAdd: [] // TODO: child entities
    });
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          addConversation={this.addConversation}
          conversation={this.state.conversation}
          handleItemClick={this.handleSidebarItemClick}
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
          entitiesToAdd={this.state.entitiesToAdd}
        />
      </div>
    );
  }
}

export default App;
