import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'reactstrap';
import Dropzone from 'react-dropzone';
import './style.css';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
}

const UploadModal = ({
  isOpen,
  onHide,
  onUpload,
}) => (
  <Modal
    isOpen={isOpen}
    toggle={onHide}
    className='custom-modal'
  >
    <span>Drag and Drop Image Below To Upload</span>
    <Dropzone
      accept="image/jpeg, image/png, video/mp4, video/x-msvideo"
      onDrop={onUpload}
      className={`custom-dropzone`}
    />
  </Modal>
);

UploadModal.propTypes = propTypes;

export default UploadModal;
