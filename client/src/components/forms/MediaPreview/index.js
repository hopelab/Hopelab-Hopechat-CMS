import React from 'react';
import PropTypes from 'prop-types';
import {
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_VIDEO,
} from '../../../utils/config';

const MediaPreview = ({ url, alt, type }) => {
  if (type === MESSAGE_TYPE_VIDEO) {
    return (
      <video
        style={{ width: '95%' }}
        src={url}
        controls
      />
    );
  }
  return (
    <div className="d-flex flex-column align-items-center pt-2 pb-2">
      <img style={{ width: '95%' }} src={url} alt={alt} />
    </div>
  );
};

MediaPreview.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  type: PropTypes.oneOf([MESSAGE_TYPE_VIDEO, MESSAGE_TYPE_IMAGE]).isRequired,
};

MediaPreview.defaultProps = {
  alt: 'img preview',
};

export default MediaPreview;
