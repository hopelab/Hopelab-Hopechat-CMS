import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const propTypes = {
  handleInput: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

const Input = props => (
  <input
    className="Input"
    type={props.type}
    name={props.name}
    value={props.value}
    id={props.id}
    onChange={props.handleInput}
  />
);

Input.propTypes = propTypes;

export default Input;
