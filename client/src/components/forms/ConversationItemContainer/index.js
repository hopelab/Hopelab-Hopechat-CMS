import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { defaultTo } from 'ramda';
import DnDPlaceHolder from '../../common/DND/DnDPlaceHolder';
import ConversationItem from '../ConversationItem';
import QuickReply from '../QuickReply';
import {
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_TRANSITION,
  MESSAGE_TYPE_TEXT,
  QUICK_REPLY_MAX_LENGTH,
  TYPE_CONVERSATION,
  ITEMS,
  MESSAGE_TYPE_QUESTION,
} from '../../../utils/config';

export class ConversationItemContainer extends Component {
  static propTypes = {
    item: PropTypes.shape({
      messageType: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
      next: PropTypes.object,
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleSaveItem: PropTypes.func.isRequired,
    handleChildEntityAddition: PropTypes.func,
    handleDeleteItem: PropTypes.func.isRequired,
    childEntities: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.quickReplyHandleNextItemSelect =
      this.quickReplyHandleNextItemSelect.bind(this);
    this.quickReplyHandleChangeText =
      this.quickReplyHandleChangeText.bind(this);
    this.quickReplyHandleAdd = this.quickReplyHandleAdd.bind(this);
    this.handleNextItemSelect = this.handleNextItemSelect.bind(this);
  }

  messageTypeHasDifferentOptions(type) {
    return (
      type === MESSAGE_TYPE_QUESTION_WITH_REPLIES ||
      type === MESSAGE_TYPE_TRANSITION
    );
  }

  handleNextItemSelect({ index, id, type, nextChild }) {
    if (this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES) {
      return this.quickReplyHandleNextItemSelect(index, id, type);
    }

    return this.transitionHandleNextItemSelect(index, id, nextChild);
  }

  transitionHandleNextItemSelect(index, id, nextChild) {
    if (!this.props.item.nextConversations) { return; }
    const nextConversations = this.props.item.nextConversations.map((nC, i) => {
      if (i !== index) { return nC; }

      return {
        ...nC,
        id,
        nextChild,
      };
    });

    this.props.handleSaveItem({
      ...this.props.item,
      nextConversations,
    });
  }

  quickReplyHandleNextItemSelect(index, id, type) {
    if (this.props.item.quick_replies) {
      const quick_replies = this.props.item.quick_replies.map((qr, i) => { //eslint-disable-line
        if (i !== index) { return qr; }
        if (!id) {
          const newType = type || MESSAGE_TYPE_QUESTION;
          const res = newType ? { type: newType } : {};
          return {
            ...qr,
            payload: JSON.stringify(res),
            next: { ...qr.next, type: newType },
          };
        }

        return {
          ...qr,
          payload: JSON.stringify({ id, type }),
          next: {},
        };
      });

      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies,
      });
    }
  }

  quickReplyHandleChangeText(index, newTitle) {
    let title = newTitle;
    if (
      this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES &&
      this.props.item.quick_replies
    ) {
      if (title && title.length > QUICK_REPLY_MAX_LENGTH) {
        title = title.slice(0, QUICK_REPLY_MAX_LENGTH);
      }
      const quick_replies = this.props.item.quick_replies.map((qr, i) => (i === index ? //eslint-disable-line
        {
          ...qr,
          title,
        } : qr));
      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies,
      });
    } else if (this.props.item.messageType === MESSAGE_TYPE_TRANSITION) {
      const nextConversations = this.props.item.nextConversations.map((nC, i) => (i === index ?
        {
          ...nC,
          text: title,
        } : nC));

      this.props.handleSaveItem({
        ...this.props.item,
        nextConversations,
      });
    }
  }

  quickReplyHandleDelete(index) {
    if (
      this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES &&
      this.props.item.quick_replies
    ) {
      const quick_replies = this.props.item.quick_replies.filter((qr, i) => ( //eslint-disable-line
        i !== index
      ));

      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies,
      });
    } else if (
      this.props.item.messageType === MESSAGE_TYPE_TRANSITION &&
      this.props.item.nextConversations
    ) {
      const nextConversations = this.props.item.nextConversations.filter((nC, i) => (
        i !== index
      ));

      this.props.handleSaveItem({
        ...this.props.item,
        nextConversations,
      });
    }
  }

  quickReplyHandleAdd() {
    if (this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES) {
      let quick_replies = []; //eslint-disable-line
      const newReply = {
        content_type: MESSAGE_TYPE_TEXT,
        title: '',
      };

      if (this.props.item.quick_replies) {
        quick_replies = [...this.props.item.quick_replies, newReply]; //eslint-disable-line
      } else {
        quick_replies = [newReply]; //eslint-disable-line
      }
      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies,
      });
    } else if (this.props.item.messageType === MESSAGE_TYPE_TRANSITION) {
      let nextConversations = [];
      const newConvo = {
        text: '',
        id: undefined,
      };

      if (this.props.item.nextConversations) {
        nextConversations = [...this.props.item.nextConversations, newConvo];
      } else {
        nextConversations = [newConvo];
      }

      this.props.handleSaveItem({
        ...this.props.item,
        nextConversations,
      });
    }
  }

  messageToTransitionTo({ nextChild, id }) {
    if (nextChild) return nextChild;
    const { messages } = this.props;
    return defaultTo(
      { id: null },
      messages.find(({ start, parent: { id: parentId } = {} }) => parentId === id && start),
    ).id;
  }

  render() {
    const { connectDropTarget, isOver, canDrop, setNewIndex, special, messages, index } = this.props;
    let container = (
      <div key="origItem" className="mb-4">
        <ConversationItem
          {...this.props}
        />
      </div>
    );

    if (this.messageTypeHasDifferentOptions(this.props.item.messageType)) {
      container = (
        <div key="origItem" className="mb-4">
          <div className="d-flex flex-row justify-content-start">
            <ConversationItem
              {...this.props}
            />
            <button
              onClick={this.quickReplyHandleAdd}
              style={{ fontSize: '1.5em' }}
            >+
            </button>
          </div>
          <div className="d-inline-flex flex-row">
            { this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES &&
              this.props.item.quick_replies &&
              this.props.item.quick_replies.map((qr, i) => (
                <QuickReply
                  special={special}
                  parentItemType={this.props.item.parent.type}
                  key={i}
                  index={i}
                  childEntities={this.props.childEntities}
                  text={qr.title}
                  nextId={JSON.parse(qr.payload || '{}').id}
                  nextType={JSON.parse(qr.payload || '{}').type}
                  onUpdateText={(...params) => (
                    this.quickReplyHandleChangeText(i, ...params)
                  )}
                  onDeleteReply={() => this.quickReplyHandleDelete(i)}
                  onNextItemSelect={args => this.handleNextItemSelect({ ...args })}
                  onNewItem={type => {
                    this.props.handleChildEntityAddition(type, newItem => {
                      this.handleNextItemSelect({ index: i, id: newItem.id, type });
                    }, index);
                  }}
                  showEndOfConversation={this.props.parentItemType === TYPE_CONVERSATION}
                />
              ))}
            { this.props.item.messageType === MESSAGE_TYPE_TRANSITION &&
              this.props.item.nextConversations &&
              this.props.item.nextConversations.map((nC, i) => (
                <QuickReply
                  parentItemType={this.props.item.parent.type}
                  key={i}
                  index={i}
                  childEntities={this.props.childEntities}
                  text={nC.text}
                  nextId={nC.id}
                  messages={messages}
                  nextChild={this.messageToTransitionTo(nC)}
                  onUpdateText={(...params) => (
                    this.quickReplyHandleChangeText(i, ...params)
                  )}
                  onDeleteReply={() => this.quickReplyHandleDelete(i)}
                  onNextItemSelect={this.handleNextItemSelect}
                  onNewItem={() => {
                    this.props.handleChildEntityAddition(this.props.item.type, newItem => {
                      this.handleNextItemSelect({ index: i, id: newItem.id, type: newItem.type });
                    }, index);
                  }}
                  messageType={this.props.item.messageType}
                  conversations={this.props.conversations}
                  showEndOfConversation={false}
                  setNewIndex={args => setNewIndex(args)}
                />
              ))}
          </div>
        </div>
      );
    }
    const array = [connectDropTarget(container)];
    if (isOver && canDrop) array.push(<DnDPlaceHolder key="dndItem" />);
    return array;
  }
}

const conversationItemTarget = {
  drop(props, monitor) {
    const draggedItem = monitor.getItem();
    if (draggedItem.index === props.index) {
      return { newIndex: draggedItem.index };
    }
    return { newIndex: props.index };
  },
  canDrop(props, monitor) {
    const draggedItem = monitor.getItem();
    if (draggedItem && draggedItem.index === props.index) {
      return false;
    }
    return true;
  },
};

export default DropTarget(ITEMS.CONVERSATION_ITEM, conversationItemTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
}))(ConversationItemContainer);
