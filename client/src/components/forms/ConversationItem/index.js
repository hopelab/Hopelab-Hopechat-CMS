import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';
import NextMessage from '../NextMessage';
import {
  messageTypes,
  TYPE_CONVERSATION,
  TYPE_COLLECTION,
  TYPE_SERIES,
  TYPE_BLOCK,
  TYPE_MESSAGE,
  MESSAGE_TYPE_QUESTION,
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_TEXT,
  MESSAGE_TYPE_ANSWER,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_VIDEO
} from '../../../utils/config';
import './style.css';

const conversationItemStyles = {
  [TYPE_CONVERSATION]: {

  },
  [TYPE_COLLECTION]: {
    backgroundColor: 'rgb(82, 175, 82)'
  },
  [TYPE_SERIES]: {

  },
  [TYPE_BLOCK]: {

  },
  [TYPE_MESSAGE]: {

  }

}

class ConversationItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      messageType: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.stirng,
      id: PropTypes.string,
      next: PropTypes.object,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onEditEntity: PropTypes.func.isRequired,
    handleSaveItem: PropTypes.func.isRequired,
    handleUpdateMessageOptions: PropTypes.func.isRequired,
    childEntities: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired
  }

  messageTypeHasContent(type) {
    return (
      type === MESSAGE_TYPE_TEXT ||
      type === MESSAGE_TYPE_QUESTION ||
      type === MESSAGE_TYPE_QUESTION_WITH_REPLIES
    );
  }

  messageTypeHasQuickReplies(type) {
    return type === MESSAGE_TYPE_QUESTION_WITH_REPLIES;
  }

  render() {
    return (
      <div className="card ConversationItem" style={{width: '360px'}}>
        <div
          className="card-header d-flex flex-row justify-content-between"
          style={{
            flexWrap: "wrap",
            ...conversationItemStyles[this.props.item.type]
          }}
        >
          <EditableText
            text={this.props.item.name}
            onEditWillFinish={name => {
              if (this.props.item.name !== name) {
                this.props.handleSaveItem({
                  ...this.props.item,
                  name
                });
              }
            }}
          />
          {this.props.item.messageType && (
            <select>
              {messageTypes.map(mt => (
                <option
                  key={mt.id}
                  value={mt.id}
                  selected={this.props.item.messageType === mt.id}
                >
                  {mt.display}
                </option>
              ))}}
            </select>
          )}
        </div>
        { this.messageTypeHasContent(this.props.item.messageType) && (
          <div className="card-block">
            <p className="card-text">
              <EditableText
                text={this.props.item.text || ''}
                isTextArea={true}
                onEditWillFinish={text => {
                  if (this.props.item.text !== text) {
                    this.props.handleSaveItem({
                      ...this.props.item,
                      text
                    });
                  }
                }}
              />
            </p>
          </div>
        )}
        <div className="card-footer">
          <NextMessage
            childEntities={this.props.childEntities}
            nextId={this.props.item.next ? this.props.item.next.id : undefined}
            handleNextMessageSelect={()=>null}
          />
        </div>
      </div>
    );
  }
}

export default ConversationItem;
