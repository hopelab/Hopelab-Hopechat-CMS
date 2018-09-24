import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './style.css';

import { Treebeard, decorators, Container } from '../TreeBeard';

import treeTheme from '../../utils/treeTheme';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired,
  toggleImageModal: PropTypes.func.isRequired,
  toggleStudyIdView: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

decorators.Container = Container;

/**
 * Sidebar Component
*/
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expandAll: false };
  }

  expandAll() {
    this.setState({ expandAll: !this.state.expandAll });
  }

  render() {
    const { expandAll } = this.state;
    const { readOnly, toggleImageModal, addConversation, toggleStudyIdView, treeData, handleTreeToggle } = this.props;
    return (
      <aside className="Sidebar col-md-4 pl-3 pt-1">
        <div className="card" style={{ borderColor: 'white' }}>
          <div className="card-header d-flex flex-row justify-content-between">
            <span style={{ fontSize: '1.1em' }}>Conversations</span>
            <div>
              <Button
                disabled={readOnly}
                color="primary"
                className="ml-1"
                onClick={toggleImageModal}
              >
                <i className="fa fa-picture-o" aria-hidden="true" />&nbsp;
                <i className="fa fa-video-camera" aria-hidden="true" />
              </Button>
              <Button
                disabled={readOnly}
                color="primary"
                className="ml-1"
                onClick={addConversation}
              >
                New
              </Button>
            </div>

          </div>
          <div className="card-header d-flex flex-row justify-content-between">
            <Button
              color="warning"
              className="ml-1"
              onClick={() => toggleStudyIdView()}
            >
              Study Ids
            </Button>
            <Button
              color="secondary"
              className="ml-1"
              onClick={() => this.expandAll()}
            >
              <i
                className={`fa fa-chevron-${expandAll ? 'down' : 'right'}`}
                onClick={() => this.expand()}
                role="button"
                tabIndex={0}
              />
              {expandAll ? 'Collapse All' : 'Expand All'}
            </Button>
          </div>
          <div className="Inner">
            <Treebeard
              style={treeTheme}
              data={treeData}
              onToggle={handleTreeToggle}
              decorators={decorators}
              expandAll={expandAll}
            />
          </div>
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = propTypes;

export default Sidebar;
