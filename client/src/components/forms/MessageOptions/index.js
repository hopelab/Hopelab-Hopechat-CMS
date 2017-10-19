import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

import { initialState } from '../../../utils/config';

const propTypes = {
  item: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const MessageOptions = props => (
  <div className="MessageEdit">
    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Message Type</ControlLabel>
      <FormControl
        id="messageType"
        name="messageType"
        componentClass="select" 
        placeholder="select"
        value={props.item.messageType}
        onChange={props.onUpdate}
      >
        { initialState.messageTypes.map((mt, i) => (
          <option value={mt.id}>{mt.display}</option>
        ))}
      </FormControl>
    </FormGroup>

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
