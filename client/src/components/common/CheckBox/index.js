import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const CheckBox = ({ checked, onChange, label }) => (
  <div className="form-check">
    <input className="form-check-input" type="checkbox" checked={checked} id="check" onClick={onChange} />
    <label className="form-check-label" htmlFor="check">
      {label}
    </label>
  </div>
);

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckBox;
