import React from 'react';
import { func, bool } from 'prop-types';
import './style.css';

export const Toggle = ({ checked, onChange }) => (
  <span
    className="switch"
    onClick={onChange}
    role="button"
    tabIndex={-1}
  >
    <input type="checkbox" checked={checked} onChange={Function.prototype} />
    <span className="slider round" />
  </span>
);

Toggle.propTypes = {
  checked: bool,
  onChange: func,
};

export default Toggle;
