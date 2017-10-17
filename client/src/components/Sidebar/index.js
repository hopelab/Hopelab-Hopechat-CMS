import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Treebeard } from 'react-treebeard';
import Button from '../forms/Button';
import { entities } from '../../utils/config';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  [entities.conversation]: PropTypes.array,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired
};

/**
 * Sidebar Component
*/
const Sidebar = props => (
  <aside className="Sidebar">
    <div className="Inner">
      <Button text="New Conversation" handleClick={props.addConversation} />

      <Treebeard data={props.treeData} onToggle={props.handleTreeToggle} />
    </div>
  </aside>
);

Sidebar.propTypes = propTypes;

export default Sidebar;
