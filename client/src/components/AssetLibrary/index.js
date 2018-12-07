import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

import MediaPreview from '../forms/MediaPreview';
import EditableText from '../forms/EditableText';
import * as config from '../../utils/config';
import DashboardHeader from '../Dashboard/DashboardHeader';

import './style.css';

export const AssetLibrary = ({ toggleImageModal, assets, deleteMedia, renameFile, readOnly, toggleReadOnly }) => (
  <div className="offset-5 bg-primary-override AssetLibrary Dashboard">
    <DashboardHeader
      itemName="Asset Library"
      special="Asset Library"
      itemId="na"
      itemType={config.TYPE_BLOCK}
      onNameChanged={Function.prototype}
      onRuleChanged={Function.prototype}
      onDelete={Function.prototype}
      onCopy={Function.prototype}
      readOnly={readOnly}
      toggleReadOnly={toggleReadOnly}
    >
      <Button
        color="default"
        className="ml-1"
        onClick={toggleImageModal}
      >
        <i className="fa fa-plus" aria-hidden="true" />&nbsp;
        New Asset
      </Button>
    </DashboardHeader>
    <div className="bg-secondary work-space">
      {assets.map((a, i) => (
        <Card key={a.key + i}>
          <CardHeader className="d-flex flex-row justify-content-between bg-default align-items-center">
            <EditableText
              text={a.key}
              onEditWillFinish={val => renameFile(val, a.url, a.type || config.MESSAGE_TYPE_IMAGE)}
            />
            <Button color="primary btn-text" onClick={() => deleteMedia(a.url, a.type || config.MESSAGE_TYPE_IMAGE)}>
              Delete
            </Button>
          </CardHeader>
          <CardBody>

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
  readOnly: PropTypes.bool,
  toggleReadOnly: PropTypes.func,
};
AssetLibrary.defaultProps = {
  toggleImageModal: Function.prototype,
};

export default AssetLibrary;
