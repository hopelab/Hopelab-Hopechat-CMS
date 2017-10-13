import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Input extends Component {
  render() {
    return (
      <input
        className="Input"
        type={this.props.type}
        name={this.props.name}
        id={this.props.id}
        onChange={this.props.handleInput}
      />
    );
  }
}

Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Input;
