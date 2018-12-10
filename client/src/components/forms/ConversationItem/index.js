import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { any, equals } from 'ramda';
import { Button } from 'reactstrap';

import { CheckBox } from '../../common/CheckBox';
import EditableText from '../EditableText';
import DelayCheckbox from '../DelayCheckbox';
import NextMessage from '../NextMessage';
import MediaDropdown from '../MediaDropdown';
import MessageTypeDropdown from '../MessageTypeDropdown';
import MediaPreview from '../MediaPreview';


import {
  TYPE_CONVERSATION,
  MESSAGE_TYPE_QUESTION,
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_TEXT,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_VIDEO,
  MESSAGE_TYPE_TRANSITION,
  ITEMS,
} from '../../../utils/config';

import { IS_STOP_MESSAGE_DETECTION, STOP_MESSAGE_ID,
  IS_END_OF_CONVERSATION, IS_CRISIS_RESPONSE_DETECTION } from '../../../utils/constants';

import './style.css';


const noModTypeOrNext = special => !any(equals(special))([IS_END_OF_CONVERSATION, IS_STOP_MESSAGE_DETECTION]);

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
      quick_replies: PropTypes.arrayOf(PropTypes.shape({
        payload: PropTypes.string,
        content_type: PropTypes.string,
        title: PropTypes.string,
      })),
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
    special: PropTypes.string,
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
        quick_replies: equals(messageType, MESSAGE_TYPE_QUESTION_WITH_REPLIES) ?
          this.props.item.quick_replies : null,
      });
    }
  }

  handleDeleteMessage() {
    const { type, id } = this.props.item;
    this.props.handleDeleteItem({ type, id });
  }

  renderItemContent(item) {
    const { special } = this.props;
    const { messageType, url, id } = item;
    const stopRegex = new RegExp(/\$\{RESUME_MESSAGE\}/);
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
          {special === IS_STOP_MESSAGE_DETECTION && id === STOP_MESSAGE_ID &&
            !stopRegex.test(editableText) &&
            <span className="bg-danger">
              The Stop Message must contain the exact string ${'{'}RESUME_MESSAGE{'}'}
            </span>}
        </div>
      );
    }

    if (this.messageTypeIsTransition(messageType)) {
      const { delayInMinutes } = this.props.item;
      const minutesInHour = 60;
      const hoursInDay = 24;
      return (
        <div className="card-block transition-secondary">
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
                url: newUrl || null,
              };
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
    const { item: { isEvent = false, name }, index, connectDragSource, className,
      item: { messageType, type: itemType, id: itemId }, special, handleDeleteItem } = this.props;
    return connectDragSource(
      <div
        key="ogItem"
        className={`card ConversationItem ${className || ''}
        ${this.props.item && this.props.item.type}
          ${messageType === MESSAGE_TYPE_TRANSITION && MESSAGE_TYPE_TRANSITION}`}
      >
        <div
          className="card-header d-flex flex-column"
        >
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-column justify-content-start">
              <EditableText
                text={name}
                onEditWillFinish={val => this.editAttribute('name', val)}
                disabled={!!special && index === 0}
              />
              <CheckBox
                checked={isEvent}
                onChange={() => this.makeEvent()}
                label="Track Events"
                size="16px"
              />
            </div>
            { this.props.item.messageType && noModTypeOrNext(special) && (
              <MessageTypeDropdown
                selected={this.props.item.messageType}
                onSelection={this.handleMessageTypeSelection}
                onDelete={this.handleDeleteMessage}
                disabled={!!special && special !== IS_CRISIS_RESPONSE_DETECTION && index === 0}
              />
            )}
            {!this.props.item.messageType && noModTypeOrNext(special) && (
              <Button
                className="btn-text"
                color="danger"
                onClick={() => handleDeleteItem({ type: itemType, id: itemId })}
              >
              Delete
              </Button>
            )}
          </div>
        </div>

        {this.renderItemContent(this.props.item)}
        {(!this.messageTypeHasDifferentOptions(this.props.item.messageType)) &&
          noModTypeOrNext(special) && (
          <div className="card-footer">
            <NextMessage
              special={special}
              parentItemType={this.props.parentItemType}
              childEntities={this.props.childEntities}
              nextId={this.props.item.next ? this.props.item.next.id : undefined}
              nextType={this.props.item.next ? this.props.item.next.type : undefined}
              showEndOfConversation={this.props.parentItemType === TYPE_CONVERSATION}
              handleNextMessageSelect={(id, type) => {
                if (this.nextHasChanged(this.props.item, id, type)) {
                  if (!id) {
                    const item = { ...this.props.item };
                    if (type) {
                      item.next = { type };
                    } else {
                      delete item.next;
                    }
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
