import React, { Component } from 'react';
import './style.css';

import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';

import { fetchAllDataForApp } from '../../utils/dataFetching';
import { entities, forms, routes } from '../../utils/config';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      collections: [],
      series: [],
      blocks: [],
      messages: [],
      itemEditing: null
    };
  }

  componentDidMount() {
    fetchAllDataForApp.call(this, routes);
  }

  addConversation = () => {
    if (this.state.itemEditing === null) {
      this.setState({
        itemEditing: {
          type: entities.conversation
        }
      });
    }
  };

  handleSidebarItemClick = item => {};

  handleUpdatingItem = () => {};

  handleDashboardClose = () => {
    this.setState({
      itemEditing: null
    });
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          addConversation={this.addConversation}
          conversations={this.state.conversations}
          handleItemClick={this.handleSidebarItemClick}
        />
        <Dashboard
          formConfig={forms}
          handleClose={this.handleDashboardClose}
          handleUpdateItem={this.handleUpdatingItem}
          itemEditing={this.state.itemEditing}
        />
      </div>
    );
  }
}

export default App;
