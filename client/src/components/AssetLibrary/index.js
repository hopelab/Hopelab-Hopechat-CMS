import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import './style.css';

export const AssetLibrary = ({ toggleImageModal }) =>
  (
    <div className="col-8 StudyIdView">
      <div
        className="card-header d-flex flex-row justify-content-between col-12"
      >
        <div
          className="d-flex flex-row justify-content-between"
        >
          <h4>Asset Library</h4>
          <Button
            color="primary"
            className="ml-1"
            onClick={toggleImageModal}
          >
            <i className="fa fa-picture-o" aria-hidden="true" />&nbsp;
            <i className="fa fa-video-camera" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );


AssetLibrary.propTypes = {
  toggleImageModal: PropTypes.func,
};
AssetLibrary.defaultProps = {
  toggleImageModal: Function.prototype,
};

export default AssetLibrary;
