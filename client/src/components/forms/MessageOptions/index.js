import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

import NextMessage from '../NextMessage';

import { initialState } from '../../../utils/config';

const propTypes = {
  childEntities: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  editingAsChildEntity: PropTypes.bool,
  index: PropTypes.number
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
  addNewQuickReply = () => {
    if ((this.props.item.quick_replies || []).length >= 11) {
      return;
    }

    const { index } = this.props;
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

    this.props.onUpdate({ index, field: 'quick_replies', value: replies });
  };

  handleUpdateQuickReplyText = (e, i) => {
    const { index } = this.props;

    let value = e.target.value;

    if (value.length > 20) {
      return;
    }

    let replies = [...this.props.item.quick_replies];

    replies[i].title = value;

    this.props.onUpdate({ index, field: 'quick_replies', value: replies });
  };

  handleUpdateQuickReplyNextPayload = (i, field, item) => {
    const { index } = this.props;

    let replies = [...this.props.item.quick_replies];

    replies[i].payload = item.id;

    this.props.onUpdate({ index, field: 'quick_replies', value: replies });
  };

  deleteQuickReply = indexToRemove => {
    const { index } = this.props;
    this.props.onUpdate({
      index,
      field: 'quick_replies',
      value: this.props.item.quick_replies.filter(
        (qr, i) => i !== indexToRemove
      )
    });
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
              this.props.onUpdate({
                index: this.props.index,
                field: e.target.name,
                value: e.target.value
              })}
          >
            {initialState.messageTypes.map((mt, i) => (
              <option key={i} value={mt.id}>
                {mt.display}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        {messageTypeHasContent(this.props.item.messageType) ? (
          <FormGroup>
            <ControlLabel>Text</ControlLabel>
            <FormControl
              componentClass="textarea"
              id="text"
              name="text"
              type="text"
              value={this.props.item.text || ''}
              onChange={e =>
                e.target.value.length < 640 &&
                this.props.onUpdate({
                  index: this.props.index,
                  field: e.target.name,
                  value: e.target.value
                })}
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
                <li key={i} className="Reply">
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

                  <NextMessage
                    nextId={qr.payload}
                    childEntities={this.props.childEntities.filter(
                      m => m.id !== this.props.item.id
                    )}
                    handleNextMessageSelect={(field, item) =>
                      this.handleUpdateQuickReplyNextPayload(i, field, item)}
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
