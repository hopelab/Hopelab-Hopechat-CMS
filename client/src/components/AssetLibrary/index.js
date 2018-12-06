import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Card, CardBody, CardHeader } from 'reactstrap';

import MediaPreview from '../forms/MediaPreview';
import EditableText from '../forms/EditableText';
import * as config from '../../utils/config';

import './style.css';

export const AssetLibrary = ({ toggleImageModal, assets, deleteMedia, renameFile }) => (
  <div className="col-8 bg-secondary">
    <div
      className="card-header d-flex flex-row justify-content-between col-12 top-bar-height"
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
    <div>
      {assets.map((a, i) => (
        <Card className="col-6" key={a.key + i}>
          <CardBody>
            <CardHeader className="d-flex flex-row justify-content-between">
              <EditableText
                text={a.key}
                onEditWillFinish={val => renameFile(val, a.url, a.type || config.MESSAGE_TYPE_IMAGE)}
              />
              <Button color="danger" onClick={() => deleteMedia(a.url, a.type || config.MESSAGE_TYPE_IMAGE)}>
                Delete
              </Button>
            </CardHeader>
            <MediaPreview {...a} type={a.type || config.MESSAGE_TYPE_IMAGE} />
          </CardBody>
        </Card>
      ))}
    </div>
  </div>
);

AssetLibrary.propTypes = {
  toggleImageModal: PropTypes.func,
  assets: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    type: PropTypes.string,
    key: PropTypes.string.isRequired,
  })),
  deleteMedia: PropTypes.func,
  renameFile: PropTypes.func,
};
AssetLibrary.defaultProps = {
  toggleImageModal: Function.prototype,
};

export default AssetLibrary;
