import React from 'react';
import { func, bool } from 'prop-types';
import './style.css';

export const Toggle = ({ checked, onChange, disabled }) => (
  <span
    onClick={disabled ? Function.prototype : onChange}
    role="button"
    tabIndex={-1}
    className={`switch ${disabled ? 'disabled' : ''}`}
  >
    <input type="checkbox" checked={checked} onChange={Function.prototype} />
    <span className="slider round" />
  </span>
);

Toggle.propTypes = {
  checked: bool,
  onChange: func,
  disabled: bool,
};

export default Toggle;
