import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Treebeard } from 'react-treebeard';
import { Button } from 'react-bootstrap';

import { entities } from '../../utils/config';
import treeTheme from '../../utils/treeTheme';

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
      <Button bsStyle="default" onClick={props.addConversation}>
        New Conversation
      </Button>

      <Treebeard
        style={treeTheme}
        data={props.treeData}
        onToggle={props.handleTreeToggle}
      />
    </div>
  </aside>
);

Sidebar.propTypes = propTypes;

export default Sidebar;
