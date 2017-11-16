import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Dropzone from 'react-dropzone';
import { Treebeard, decorators } from '../TreeBeard';
import { Button, ControlLabel, Glyphicon } from 'react-bootstrap';

import { entities } from '../../utils/config';
import treeTheme from '../../utils/treeTheme';

const propTypes = {
  addImage: PropTypes.func.isRequired,
  addConversation: PropTypes.func.isRequired,
  [entities.conversation]: PropTypes.array,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired,
  itemEditing: PropTypes.object
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
      {node.isLive ? <span className="Circle green" /> : null}
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
      <div className="ImageUpload">
        <ControlLabel>Upload Image</ControlLabel>
        <Dropzone accept="image/jpeg, image/png" onDrop={props.addImage} />
      </div>

      <Button
        bsStyle="primary"
        onClick={props.addConversation}
        disabled={!!props.itemEditing}
      >
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
