import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const CheckBox = ({ checked, onChange, label, disabled }) => (
  <span onClick={onChange} role="button" tabIndex={0} className={`CheckBox ${disabled ? 'disabled' : ''}`}>
    <input type="checkbox" checked={checked} />
    <span />
    <label>{label}</label>
  </span>
);

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default CheckBox;
