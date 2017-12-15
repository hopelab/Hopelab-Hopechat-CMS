import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';
import NextMessage from '../NextMessage';
import ImageDropdown from '../ImageDropdown';
import MessageTypeDropdown from '../MessageTypeDropdown';
import MediaPreview from '../MediaPreview';
import {
  TYPE_CONVERSATION,
  TYPE_COLLECTION,
  TYPE_SERIES,
  TYPE_BLOCK,
  TYPE_MESSAGE,
  MESSAGE_TYPE_QUESTION,
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_TEXT,
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
    backgroundColor: 'rgb(82, 175, 82)'
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
    handleSaveItem: PropTypes.func.isRequired,
    handleUpdateMessageOptions: PropTypes.func.isRequired,
    handleChildEntityAddition: PropTypes.func,
    handleDeleteItem: PropTypes.func.isRequired,
    childEntities: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleMessageTypeSelection =
      this.handleMessageTypeSelection.bind(this);
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
  }

  messageTypeHasContent(type) {
    return (
      type === MESSAGE_TYPE_TEXT ||
      type === MESSAGE_TYPE_QUESTION ||
      type === MESSAGE_TYPE_QUESTION_WITH_REPLIES ||
      type === MESSAGE_TYPE_VIDEO
    );
  }

  messageTypeHasUrl(type) {
    return (
      type === MESSAGE_TYPE_VIDEO ||
      type === MESSAGE_TYPE_IMAGE
    );
  }

  messageTypeHasQuickReplies(type) {
    return type === MESSAGE_TYPE_QUESTION_WITH_REPLIES;
  }

  messageTypeIsImage(type) {
    return type === MESSAGE_TYPE_IMAGE;
  }

  nextHasChanged(item, id, type) {
    if (id === undefined && !item.next) { return false; }
    if (!item.next) { return true; }
    return item.next.id !== id || item.next.type !== type;
  }

  handleMessageTypeSelection(messageType) {
    if (messageType !== this.props.item.messageType) {
      this.props.handleSaveItem({
        ...this.props.item,
        messageType
      });
    }
  }

  handleDeleteMessage() {
    const {type, id} = this.props.item;
    this.props.handleDeleteItem({type, id});
  }

  renderItemContent(item) {
    let {messageType, url} = item;
    if (this.messageTypeHasContent(messageType)) {
      let editableText = this.messageTypeHasUrl(messageType) ?
        url : this.props.item.text;

      return (
        <div className="card-block">
          <p className="card-text">
            <EditableText
              text={editableText || ''}
              isTextArea={true}
              onEditWillFinish={text => {
                let newItem = this.messageTypeHasUrl(messageType) ? {
                  ...item,
                  url: text
                } : {
                  ...item,
                  text
                }
                if (item.text !== text) {
                  this.props.handleSaveItem(newItem);
                }
              }}
            />
            {this.messageTypeHasUrl(messageType) && url && (
              <MediaPreview url={url} type={messageType} />
            )}
          </p>
        </div>
      );
    }

    if (this.messageTypeIsImage(messageType)) {
      return (
        <div className="card-block">
          <ImageDropdown
            selectedUrl={url}
            images={this.props.images}
            onSelection={url => {
              let newItem = {
                ...item,
                url
              };
              if (!url) {
                delete newItem.url;
              }
              this.props.handleSaveItem(newItem);
            }}
          />
          {this.messageTypeHasUrl(messageType) && url && (
            <MediaPreview url={url} type={messageType} />
          )}
        </div>
      );
    }
  }

  render() {
    return (
      <div
        className={`card ConversationItem ${this.props.className}`}
        style={{width: '360px'}}
      >
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
          { this.props.item.messageType && (
            <MessageTypeDropdown
              selected={this.props.item.messageType}
              onSelection={this.handleMessageTypeSelection}
              onDelete={this.handleDeleteMessage}
            />
          )}

        </div>
        {this.renderItemContent(this.props.item)}
        {(!this.messageTypeHasQuickReplies(this.props.item.messageType)) && (
          <div className="card-footer">
            <NextMessage
              childEntities={this.props.childEntities}
              nextId={this.props.item.next ? this.props.item.next.id : undefined}
              handleNextMessageSelect={(id, type)=> {
                if (this.nextHasChanged(this.props.item, id, type)) {
                  if (!id) {
                    let item = Object.assign({}, this.props.item);
                    delete item.next;
                    this.props.handleSaveItem(item)
                  }
                  this.props.handleSaveItem({
                    ...this.props.item,
                    next: {id, type}
                  })
                }

              }}
              onNewItem={() => {
                this.props.handleChildEntityAddition(this.props.item.type, newItem => {
                  this.props.handleSaveItem({
                    ...this.props.item,
                    next: {id: newItem.id, type: newItem.type}
                  });
                });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ConversationItem;
