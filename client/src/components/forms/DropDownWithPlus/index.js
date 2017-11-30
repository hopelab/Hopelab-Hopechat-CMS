import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const propTypes = {
  onClickPlus: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

const DropDownWithPlus = ({
  onClickPlus,
  options
}) => (
  <div className="AddButtonWrapper">
    <span className="Add" onClick={onClickPlus}>
      +
    </span>
    <select
      onChange={this.handleChildSelection}
    >
      {options.map(c => (
        <option key={c} value={c} >{c}</option>
      ))}
    </select>
  </div>
);

DropDownWithPlus.defaultProps = {
  onClickPlus() {}
};

DropDownWithPlus.propTypes = propTypes;

export default DropDownWithPlus;
