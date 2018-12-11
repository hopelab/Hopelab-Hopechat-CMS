import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { INTRO_CONVERSATION_ID } from '../../../utils/constants';

class Container extends React.Component {
  state = {
    loading: false,
  }

  handleClick({ expand, onClick }) {
    onClick({ expand });
  }

  expand() {
    this.props.onExpand();
  }

  render() {
    const { onClick, node, expanded, terminal, level, selected } = this.props;
    const { loading } = this.state;
    const isIntro = node.id === INTRO_CONVERSATION_ID;
    const nameText = (
      <span className={`nav-link ${isIntro ? 'intro' : ''}`}>
        {node.name}&nbsp;
        {isIntro && '(START)'}
        {node.isLive ? <i className="fa fa-circle live-circle" /> : null}
      </span>
    );
    return (
      <Button
        outline={!selected}
        color={`${selected ? 'default' : 'primary'}`}
        className="d-flex align-items-center justify-content-start nav-item"
        onClick={() => this.handleClick({ expand: false, onClick })}
      >
        <span style={{ paddingLeft: `${level * 10}px` }} />

        {!terminal &&
        <i
          className={`fa fa-caret-${expanded ? 'down' : 'right'}`}
          onClick={() => this.expand()}
          role="button"
          tabIndex={0}
        />}
        {nameText}
        {loading && <i className="fa fa-spinner fa-pulse" />}
      </Button>
    );
  }
}

Container.propTypes = {
  onClick: PropTypes.func,
  node: PropTypes.object,
  level: PropTypes.number.isRequired,
  onExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  terminal: PropTypes.bool.isRequired,
  selected: PropTypes.bool,
};

export default Container;
