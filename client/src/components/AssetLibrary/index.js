import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Card,
CardBody,
CardHeader,
CardSubtitle } from 'reactstrap';
import * as dataUtil from '../../utils/data';

import MediaPreview from '../forms/MediaPreview';
import { retrieveAssets } from '../../utils/aws';
import * as config from '../../utils/config';

import './style.css';

export class AssetLibrary extends React.Component {

  charlie() {

  }
  render() {
    const { toggleImageModal, assets, deleteMedia } = this.props;
    return (
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
        <Container fluid>
          {assets.map((a, i) => (
            <Card className="col-6" key={a.key + i}>
              <CardBody>
                <CardHeader className="d-flex flex-row justify-content-between">
                  {a.key}
                  <Button color="danger" onClick={() => deleteMedia(a.url, a.type || config.MESSAGE_TYPE_IMAGE)}>Delete</Button>
                </CardHeader>
                <CardSubtitle>{a.url}</CardSubtitle>
                <MediaPreview {...a} />
              </CardBody>
            </Card>
          ))}
        </Container>
      </div>
    );
  }
}

AssetLibrary.propTypes = {
  toggleImageModal: PropTypes.func,
};
AssetLibrary.defaultProps = {
  toggleImageModal: Function.prototype,
};

export default AssetLibrary;
