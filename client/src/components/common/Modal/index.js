import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import './style.css';

const DashboardModal = ({ onCancel, onConfirm, text, header }) => (
  <Modal isOpen toggle={onCancel}>
    <ModalHeader toggle={onCancel}>{header}</ModalHeader>
    <ModalBody>
      {text}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onConfirm}>Yes</Button>{' '}
      <Button color="secondary" onClick={onCancel}>Cancel</Button>
    </ModalFooter>
  </Modal>
);

DashboardModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  text: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
};

export default DashboardModal;
