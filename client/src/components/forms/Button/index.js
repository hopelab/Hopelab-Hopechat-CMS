import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Button extends Component {
  render() {
    return (
      <button className={this.props.className} onClick={this.props.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
