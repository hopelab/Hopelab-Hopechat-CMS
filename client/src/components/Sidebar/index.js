import React from 'react';
import PropTypes from 'prop-types';
//import './style.css';

import { Treebeard, decorators } from '../TreeBeard';
import { Button } from 'reactstrap';

import { entities } from '../../utils/config';
import treeTheme from '../../utils/treeTheme';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  [entities.conversation]: PropTypes.array,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired,
  toggleImageModal: PropTypes.func.isRequired,
  itemEditing: PropTypes.object
};

function handleClick({ expand, onClick }) {
  onClick({ expand });
}

const PoolContainer = ({ onClick, node }) => {
  //const hasChildren = node.children && node.children.length;

  let icon = null;

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
  <aside className="Sidebar col-md-4 pl-3 pt-1">
    <div className="card" style={{borderColor: 'white'}}>
      <div className="card-header d-flex flex-row justify-content-between">
        <span style={{fontSize: '1.1em'}}>Conversations</span>
        <div>
          <Button
            color="primary"
            className='ml-1'
            onClick={props.toggleImageModal}
          >
            <i className="fa fa-picture-o" aria-hidden="true"></i>&nbsp;
            <i className="fa fa-video-camera" aria-hidden="true"></i>
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
