import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const getBorderRadius = size =>
  (size ? `${Math.ceil(parseInt(size.split('px')[0], 10) / 4)}px` : '8px');

export const CheckBox = ({ checked, onChange, label, disabled, size }) => (
  <span
    onClick={onChange}
    role="button"
    tabIndex={0}
    className={`CheckBox ${disabled ? 'disabled' : ''}`}
  >
    <input type="checkbox" checked={checked} onChange={Function.prototype} />
    <span style={{ width: size, height: size, borderRadius: getBorderRadius(size) }} />
    <label>{label}</label>
  </span>
);

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

CheckBox.defaultProps = {
  size: '31px',
};

export default CheckBox;
