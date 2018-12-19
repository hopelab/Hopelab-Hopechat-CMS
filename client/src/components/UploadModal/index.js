import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import Dropzone from 'react-dropzone';
import './style.css';

class UploadModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isOpen && this.props.isOpen && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      isOpen,
      onHide,
      onUpload,
    } = this.props;

    const { loading } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        toggle={() => {
          this.setState({ loading: false }, () => {
            onHide();
          });
        }}
        className="custom-modal d-flex"
      >
        <span>Drag and Drop Image Below To Upload</span>
        <Dropzone
          accept="image/jpeg, image/png, video/mp4, video/x-msvideo, image/gif"
          onDrop={(accepted, rejected) => {
            this.setState({ loading: true }, () => {
              onUpload(accepted, rejected);
            });
          }}
          className="custom-dropzone d-flex justify-content-center"
        >
          <span>Or click here to select from file system</span>
        </Dropzone>
        { loading ? <i className="fa fa-spinner fa-3x loading" /> : undefined }
      </Modal>
    );
  }
}


export default UploadModal;
