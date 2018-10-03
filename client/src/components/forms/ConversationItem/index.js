import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import { CheckBox } from '../../common/CheckBox';

import EditableText from '../EditableText';
import DelayCheckbox from '../DelayCheckbox';
import NextMessage from '../NextMessage';
import MediaDropdown from '../MediaDropdown';
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
  MESSAGE_TYPE_VIDEO,
  MESSAGE_TYPE_TRANSITION,
  ITEMS,
} from '../../../utils/config';
import './style.css';

const conversationItemStyles = {
  [TYPE_CONVERSATION]: {

  },
  [TYPE_COLLECTION]: {
    backgroundColor: 'rgb(82, 175, 82)',
  },
  [TYPE_SERIES]: {
    backgroundColor: 'rgb(82, 175, 82)',
  },
  [TYPE_BLOCK]: {

  },
  [TYPE_MESSAGE]: {

  },
};

class ConversationItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      messageType: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
      next: PropTypes.object,
      delayInMinutes: PropTypes.number,
      text: PropTypes.string,
      isEvent: PropTypes.bool,
    }).isRequired,
    handleSaveItem: PropTypes.func.isRequired,
    handleChildEntityAddition: PropTypes.func,
    handleDeleteItem: PropTypes.func.isRequired,
    childEntities: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    videos: PropTypes.array.isRequired,
    className: PropTypes.string,
    parentItemType: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
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
      type === MESSAGE_TYPE_QUESTION_WITH_REPLIES
    );
  }

  messageTypeHasUrl(type) {
    return (
      type === MESSAGE_TYPE_VIDEO ||
      type === MESSAGE_TYPE_IMAGE
    );
  }

  messageTypeHasDifferentOptions(type) {
    return (
      type === MESSAGE_TYPE_QUESTION_WITH_REPLIES ||
      type === MESSAGE_TYPE_TRANSITION
    );
  }

  messageTypeIsTransition(type) {
    return type === MESSAGE_TYPE_TRANSITION;
  }

  messageTypeIsMedia(type) {
    return (
      type === MESSAGE_TYPE_VIDEO ||
      type === MESSAGE_TYPE_IMAGE
    );
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
        messageType,
      });
    }
  }

  handleDeleteMessage() {
    const { type, id } = this.props.item;
    this.props.handleDeleteItem({ type, id });
  }

  renderItemContent(item) {
    const { messageType, url } = item;
    if (this.messageTypeHasContent(messageType)) {
      const editableText = this.messageTypeHasUrl(messageType) ?
        url : this.props.item.text;

      return (
        <div className="card-block">
          <p className="card-text">
            <EditableText
              text={editableText || ''}
              isTextArea
              onEditWillFinish={text => {
                const newItem = this.messageTypeHasUrl(messageType) ? {
                  ...item,
                  url: text,
                } : {
                  ...item,
                  text,
                };
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

    if (this.messageTypeIsTransition(messageType)) {
      const { delayInMinutes } = this.props.item;
      const minutesInHour = 60;
      const hoursInDay = 24;
      return (
        <div className="card-block">
          <div className="card-text">
            <DelayCheckbox
              delayChecked={
                !!delayInMinutes
              }
              delayInDays={
                Number.isFinite(parseFloat(delayInMinutes)) ?
                  `${parseFloat(delayInMinutes) / minutesInHour / hoursInDay}` :
                  ''
              }
              onDelayChecked={
                checked => {
                  if (checked) {
                    this.props.handleSaveItem({
                      ...this.props.item,
                      delayInMinutes: 14 * minutesInHour * hoursInDay,
                    });
                  } else {
                    const itemCopy = { ...this.props.item };
                    delete itemCopy.delayInMinutes;
                    this.props.handleSaveItem(itemCopy);
                  }
                }
              }
              onDelayInDaysWillFinish={delayInDays => {
                const delay = parseFloat(delayInDays);
                if (Number.isFinite(delay)) {
                  const tempDelay = delay * minutesInHour * hoursInDay;

                  const newItem = {
                    ...this.props.item,
                    delayInMinutes: tempDelay,
                  };
                  this.props.handleSaveItem(newItem);
                }
              }}
            />
          </div>
        </div>
      );
    }


    if (this.messageTypeIsMedia(messageType)) {
      return (
        <div className="card-block">
          <MediaDropdown
            selectedUrl={url}
            media={
              this.messageTypeIsImage(messageType) ?
                this.props.images : this.props.videos}
            onSelection={newUrl => {
              const newItem = {
                ...item,
                url: newUrl,
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
    return null;
  }

  makeEvent() {
    if (this.props.item) {
      const { isEvent = false } = this.props.item;
      this.props.handleSaveItem({
        ...this.props.item,
        isEvent: !isEvent,
      });
    }
  }

  editAttribute(name, value) {
    if (this.props.item[name] !== value) {
      this.props.handleSaveItem({
        ...this.props.item,
        [name]: value,
      });
    }
  }

  render() {
    const { item: { isEvent = false }, index } = this.props;
    const { connectDragSource, className } = this.props;
    return connectDragSource(
      <div
        key="ogItem"
        className={`card ConversationItem ${className}`}
        style={{ width: '360px' }}
      >
        <div
          className="card-header d-flex flex-column"
        >
          <div
            className="d-flex flex-row justify-content-between"
            style={{
              flexWrap: 'wrap',
              ...conversationItemStyles[this.props.item.type],
            }}
          >
            <EditableText
              text={this.props.item.name}
              onEditWillFinish={val => this.editAttribute('name', val)}
            />
            { this.props.item.messageType && (
              <MessageTypeDropdown
                selected={this.props.item.messageType}
                onSelection={this.handleMessageTypeSelection}
                onDelete={this.handleDeleteMessage}
              />
            )}
          </div>
          <CheckBox
            checked={isEvent}
            onChange={() => this.makeEvent()}
            label="Track Events"
          />
        </div>

        {this.renderItemContent(this.props.item)}
        {(!this.messageTypeHasDifferentOptions(this.props.item.messageType)) && (
          <div className="card-footer">
            <NextMessage
              parentItemType={this.props.parentItemType}
              childEntities={this.props.childEntities}
              nextId={this.props.item.next ? this.props.item.next.id : undefined}
              showEndOfConversation={this.props.parentItemType === TYPE_CONVERSATION}
              handleNextMessageSelect={(id, type) => {
                if (this.nextHasChanged(this.props.item, id, type)) {
                  if (!id) {
                    const item = Object.assign({}, this.props.item);
                    delete item.next;
                    this.props.handleSaveItem(item);
                  } else {
                    this.props.handleSaveItem({
                      ...this.props.item,
                      next: { id, type },
                    });
                  }
                }
              }}
              onNewItem={type => {
                this.props.handleChildEntityAddition(type, newItem => {
                  this.props.handleSaveItem({
                    ...this.props.item,
                    next: { id: newItem.id, type: newItem.type },
                  });
                }, index);
              }}
            />
          </div>
        )}
      </div>,
    );
  }
}


const dragSource = {
  beginDrag({ index }) {
    return { index };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { newIndex } = monitor.getDropResult();
      props.setNewIndex(newIndex);
    }
  },
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(ITEMS.CONVERSATION_ITEM, dragSource, collect)(ConversationItem);
