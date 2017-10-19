import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

import { initialState } from '../../../utils/config';

const propTypes = {
  item: PropTypes.object.isRequired,
  handleUpdateMessageOptions: PropTypes.func.isRequired
};

/**
 * Check Message Type is Text or Question
*/
function messageTypeHasContent(type) {
  return (
    type === 'text' || type === 'question' || type === 'questionWithReplies'
  );
}

/**
 * Check Message Type is Question with Replies
*/
function messageTypeHasQuickReplies(type) {
  return type === 'questionWithReplies';
}

class MessageOptions extends Component {
  constructor(props) {
    super(props);
  }

  addNewQuickReply = () => {
    let replies = [];
    const newReply = {
      type: 'text',
      title: ''
    };

    if (this.props.item.quick_replies) {
      replies = this.props.item.quick_replies.concat(newReply);
    } else {
      replies = replies.concat(newReply);
    }

    this.props.handleUpdateMessageOptions('quick_replies', replies);
  };

  handleUpdateQuickReplyText = (e, i) => {
    let value = e.target.value;

    let replies = [...this.props.item.quick_replies];

    replies[i].title = value;

    this.props.handleUpdateMessageOptions('quick_replies', replies);
  };

  deleteQuickReply = indexToRemove => {
    this.props.handleUpdateMessageOptions(
      'quick_replies',
      this.props.item.quick_replies.filter((qr, i) => i !== indexToRemove)
    );
  };

  render() {
    return (
      <div className="MessageEdit">
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Message Type</ControlLabel>
          <FormControl
            name="messageType"
            componentClass="select"
            placeholder="select"
            value={this.props.item.messageType}
            onChange={e =>
              this.props.handleUpdateMessageOptions('messageType', e)}
          >
            {initialState.messageTypes.map((mt, i) => (
              <option key={i} value={mt.id}>
                {mt.display}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        {messageTypeHasContent(this.props.item.messageType) ? (
          <FormGroup className="Tags">
            <ControlLabel>Content</ControlLabel>
            <FormControl
              componentClass="textarea"
              id="content"
              name="content"
              type="text"
              value={this.props.item.content || ''}
              onChange={e =>
                this.props.handleUpdateMessageOptions('content', e)}
            />
          </FormGroup>
        ) : null}

        {messageTypeHasQuickReplies(this.props.item.messageType) ? (
          <FormGroup>
            <ControlLabel>Quick Replies</ControlLabel>
            <Button bsStyle="success" onClick={this.addNewQuickReply}>
              Add
            </Button>

            <ul className="QuickReplies">
              {(this.props.item.quick_replies || []).map((qr, i) => (
                <li key={i}>
                  <Button
                    bsStyle="danger"
                    onClick={_ => this.deleteQuickReply(i)}
                  >
                    X
                  </Button>
                  <FormControl
                    type="text"
                    name={`quick-reply-${i}-title`}
                    id={`quick-reply-${i}-title`}
                    value={qr.title}
                    onChange={e => this.handleUpdateQuickReplyText(e, i)}
                  />
                </li>
              ))}
            </ul>
          </FormGroup>
        ) : null}
      </div>
    );
  }
}

MessageOptions.propTypes = propTypes;

export default MessageOptions;
