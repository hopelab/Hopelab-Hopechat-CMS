import React from 'react';
import PropTypes from 'prop-types';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  onSetFocus() {
    this.setState({ focused: !this.state.focused });
  }

  handleClick({ expand, onClick }) {
    onClick({ expand });
  }

  expand() {
    this.props.onExpand();
  }

  render() {
    const { onClick, node, expanded, terminal } = this.props;
    const { focused } = this.state;

    return (
      <div
        role="button"
        tabIndex={0}
        className={`PoolContainer ${focused ? 'focused' : ''}`}
        style={{
          color: node.active ? '#fff' : '#333',
          background: node.active ? '#428bca' : 'transparent',
        }}
        onMouseOver={() => { this.onSetFocus(); }}
        onMouseOut={() => { this.onSetFocus(); }}
        onFocus={() => { this.onSetFocus(); }}
        onBlur={() => { this.onSetFocus(); }}
        onClick={() => {
          this.handleClick({ expand: false, onClick });
        }}
      >
        {!terminal &&
        <i
          className={`fa fa-chevron-${expanded ? 'down' : 'right'}`}
          onClick={() => this.expand()}
          role="button"
          tabIndex={0}
        />}
        <span>
          {node.name}&nbsp;
        </span>
        {node.isLive ? <i className="fa fa-circle live-circle" /> : null}
      </div>
    );
  }
}

Container.propTypes = {
  onClick: PropTypes.func,
  node: PropTypes.object,
  onExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  terminal: PropTypes.bool.isRequired,
};

export default Container;
