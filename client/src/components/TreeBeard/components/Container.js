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

  render() {
    const { onClick, node } = this.props;
    const { focused } = this.state;

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
        className={`PoolContainer ${focused ? 'focused' : ''}`}
        style={{
          color: node.active ? '#fff' : '#333',
          background: node.active ? '#428bca' : 'transparent',
        }}
        onMouseOver={() => { this.onSetFocus(); }}
        onMouseOut={() => { this.onSetFocus(); }}
        onFocus={() => { this.onSetFocus(); }}
        onBlur={() => { this.onSetFocus(); }}
      >
        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            this.handleClick({ expand: false, onClick });
          }}
        >
          {node.name}{node.id}
        </span>
        {node.isLive ? <span className="Circle green" /> : null}
      </div>
    );
  }
}

Container.propTypes = {
  onClick: PropTypes.func,
  node: PropTypes.object,
};

export default Container;
