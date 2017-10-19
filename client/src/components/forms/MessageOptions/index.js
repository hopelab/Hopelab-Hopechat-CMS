import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const propTypes = {
  item: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const MessageOptions = props => (
  <div className="MessageEdit">
    <FormGroup className="Tags">
      <ControlLabel>Content</ControlLabel>
      <FormControl
        componentClass="textarea"
        id="content"
        name="content"
        type="text"
        value={props.item.content || ''}
        onChange={props.onUpdate}
      />
    </FormGroup>
  </div>
);

MessageOptions.propTypes = propTypes;

export default MessageOptions;
