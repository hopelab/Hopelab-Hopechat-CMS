import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { Treebeard, decorators, Container } from '../TreeBeard';

import treeTheme from '../../utils/treeTheme';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired,
  toggleImageModal: PropTypes.func.isRequired,
};

decorators.Container = Container;

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
