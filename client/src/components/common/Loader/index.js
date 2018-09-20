import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Loader = ({ size, text }) => (
  <div className="Loader">
    <i className={`fa fa-spinner fa-pulse fa-${size}x fa-fw`} />
    {text && <span >Loading...</span>}
  </div>
);

Loader.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5]),
  text: PropTypes.bool,
};

Loader.defaultProps = {
  size: 3,
  text: true,
};

export default Loader;
