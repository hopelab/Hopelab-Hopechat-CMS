import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { Treebeard, decorators } from '../TreeBeard';

import treeTheme from '../../utils/treeTheme';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired,
  toggleImageModal: PropTypes.func.isRequired,
};

function handleClick({ expand, onClick }) {
  onClick({ expand });
}

const PoolContainer = ({ onClick, node }) => {
  // const hasChildren = node.children && node.children.length;

  const icon = null;

  // TODO: Look into supporting expandable tree with +, - icon.
  // hasChildren ? (
  //   node.toggled ? (
  //     <Glyphicon glyph="minus" />
  //   ) : (
  //     <Glyphicon glyph="plus" />
  //   )
  // ) : null;

  return (
    <div
      className="PoolContainer"
      style={{
        color: node.active ? '#fff' : '#333',
        background: node.active ? '#428bca' : 'transparent',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        className="IconContainer"
        onClick={() => {
          handleClick({ expand: true, onClick });
        }}
      >
        {icon}
      </div>
      <span
        role="button"
        tabIndex={0}
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

PoolContainer.propTypes = {
  onClick: PropTypes.func,
  node: PropTypes.node,
};

decorators.Container = PoolContainer;

/**
 * Sidebar Component
*/
const Sidebar = props => (
  <aside className="Sidebar col-md-4 pl-3 pt-1">
    <div className="card" style={{ borderColor: 'white' }}>
      <div className="card-header d-flex flex-row justify-content-between">
        <span style={{ fontSize: '1.1em' }}>Conversations</span>
        <div>
          <Button
            color="primary"
            className="ml-1"
            onClick={props.toggleImageModal}
          >
            <i className="fa fa-picture-o" aria-hidden="true" />&nbsp;
            <i className="fa fa-video-camera" aria-hidden="true" />
          </Button>
          <Button
            color="primary"
            className="ml-1"
            onClick={props.addConversation}
          >
            New
          </Button>
        </div>
      </div>
      <div className="Inner">
        <Treebeard
          style={treeTheme}
          data={props.treeData}
          onToggle={props.handleTreeToggle}
          decorators={decorators}
        />
      </div>
    </div>
  </aside>
);

Sidebar.propTypes = propTypes;

export default Sidebar;
