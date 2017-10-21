import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Treebeard, decorators } from '../TreeBeard';
import { Button, Glyphicon } from 'react-bootstrap';

import { entities } from '../../utils/config';
import treeTheme from '../../utils/treeTheme';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  [entities.conversation]: PropTypes.array,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired
};

function handleClick({ expand, onClick }) {
  onClick({ expand });
}

const PoolContainer = ({ onClick, node }) => {
  const hasChildren = node.children && node.children.length;

  let icon = hasChildren ? (
    node.toggled ? (
      <Glyphicon glyph="minus" />
    ) : (
      <Glyphicon glyph="plus" />
    )
  ) : null;

  return (
    <div
      className="PoolContainer"
      style={{
        color: node.active ? '#fff' : '#333',
        background: node.active ? '#428bca' : 'transparent'
      }}
    >
      <div
        className="IconContainer"
        onClick={() => {
          handleClick({ expand: true, onClick });
        }}
      >
        {icon}
      </div>
      <span
        onClick={() => {
          handleClick({ expand: false, onClick });
        }}
      >
        {node.name}
      </span>
    </div>
  );
};

decorators.Container = PoolContainer;

/**
 * Sidebar Component
*/
const Sidebar = props => (
  <aside className="Sidebar">
    <div className="Inner">
      <Button bsStyle="primary" onClick={props.addConversation}>
        New Conversation
      </Button>

      <Treebeard
        style={treeTheme}
        data={props.treeData}
        onToggle={props.handleTreeToggle}
        decorators={decorators}
      />
    </div>
  </aside>
);

Sidebar.propTypes = propTypes;

export default Sidebar;
