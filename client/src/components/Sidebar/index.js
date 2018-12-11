import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container as BootContainer } from 'reactstrap';
import './style.css';
import { DASHBOARD_COMPONENTS } from '../../utils/constants';

import { Treebeard, decorators, Container } from '../TreeBeard';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  selectedItem: PropTypes.string,
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
    const { readOnly, addConversation, toggleView, treeData, handleTreeToggle, selectedItem } = this.props;
    const buttonArray = [
      {
        name: DASHBOARD_COMPONENTS.studyIds,
        title: 'Study Ids',
      },
      {
        name: DASHBOARD_COMPONENTS.assets,
        title: 'Asset Library',
      },
      {
        name: DASHBOARD_COMPONENTS.quickReply,
        title: 'Quick Reply Retry',
      },
      {
        name: DASHBOARD_COMPONENTS.crisis,
        title: 'Crisis Detection',
      },
      {
        name: DASHBOARD_COMPONENTS.stop,
        title: 'Stop Detection',
      },
      {
        name: DASHBOARD_COMPONENTS.eoc,
        title: 'End Of Conversation',
      },
    ].map(({ name, title }) => (
      <Button
        color="primary"
        size="lg"
        block
        onClick={() => toggleView(name)}
        key={name}
        className={`text-left ${selectedItem === name ? 'selected' : ''}`}
      >
        {title}
      </Button>
    ));
    return (
      <aside className="Sidebar col-md-3">
        <div className="darkblue-bg sidebar-guts">
          <BootContainer fluid >
            <div className="top-bar-height justify-content-end flex-column d-flex Components">
              <h4>Components</h4>
            </div>
            <div className="wt-bdr-rt mt-3">
              {buttonArray}
            </div>
          </BootContainer>
          <div className="Conversations wt-bdr-rt">
            <div className="d-flex flex-column header">
              <h4 className="text-left">Conversations</h4>
              <div className="d-flex flex-row justify-content-around">
                <Button
                  className="btn-text"
                  disabled={readOnly}
                  color="danger"
                  onClick={addConversation}
                >
                  New
                </Button>
                <Button
                  className="btn-text"
                  color="danger"
                  onClick={() => this.expandAll()}
                >
                  {expandAll ? 'Collapse' : 'Expand'}
                </Button>
              </div>
            </div>
            <div className="Inner">
              <Treebeard
                data={treeData}
                onToggle={handleTreeToggle}
                expandAll={expandAll}
                selectedItem={selectedItem}
              />
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = propTypes;

export default Sidebar;
