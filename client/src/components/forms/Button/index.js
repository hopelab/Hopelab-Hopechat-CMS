import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

const Button = props => (
  <button className={props.className} onClick={props.handleClick}>
    {props.text}
  </button>
);

Button.propTypes = propTypes;

export default Button;
