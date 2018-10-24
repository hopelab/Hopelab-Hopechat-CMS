import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container as BootContainer } from 'reactstrap';
import './style.css';
import { DASHBOARD_COMPONENTS } from '../../utils/constants';

import { Treebeard, decorators, Container } from '../TreeBeard';

import treeTheme from '../../utils/treeTheme';

const propTypes = {
  addConversation: PropTypes.func.isRequired,
  treeData: PropTypes.object.isRequired,
  handleTreeToggle: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired,
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
    const { readOnly, addConversation, toggleView, treeData, handleTreeToggle } = this.props;
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
    ].map(e => (
      <Button
        outline
        color="secondary"
        size="lg"
        block
        onClick={() => toggleView(e.name)}
        key={e.name}
      >
        {e.title}
      </Button>
    ));
    return (
      <aside className="Sidebar col-md-4 pl-3 pt-1">
        <div className="card" style={{ borderColor: 'white' }}>
          <BootContainer fluid >
            <h4>Components</h4>
            <div className="blck-box">
              {buttonArray}
            </div>

          </BootContainer>
          <div className="card-header d-flex flex-row justify-content-between">
            <h4>Conversations</h4>

            <Button
              disabled={readOnly}
              color="primary"
              className="ml-1"
              onClick={addConversation}
            >
              New
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
