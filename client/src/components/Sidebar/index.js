import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Button from '../forms/Button';

/**
 * Sidebar Component
*/
class Sidebar extends Component {
  render() {
    return (
      <aside className="Sidebar">
        <div className="Inner">
          <Button
            text="New Conversation"
            handleClick={this.props.addConversation}
          />

          <ul style={{ paddingTop: 30 }}>
            {this.props.conversations.map((c, i) => (
              <li key={i} onClick={() => this.props.handleItemClick(c)}>
                {c.id}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  addConversation: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  conversations: PropTypes.array
};

export default Sidebar;
