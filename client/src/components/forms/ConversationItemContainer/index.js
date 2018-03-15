import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationItem from '../ConversationItem';
import QuickReply from '../QuickReply';
import {
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_TRANSITION,
  MESSAGE_TYPE_TEXT,
  QUICK_REPLY_MAX_LENGTH,
  TYPE_CONVERSATION,
} from '../../../utils/config';

class ConversationItemContainer extends Component {
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
    handleChildEntityAddition: PropTypes.func,
    handleDeleteItem: PropTypes.func.isRequired,
    childEntities: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired
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

  handleNextItemSelect(index, id, type) {
    if (this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES) {
      return this.quickReplyHandleNextItemSelect(index, id, type);
    }

    return this.transitionHandleNextItemSelect(index, id, type);
  }

  transitionHandleNextItemSelect(index, id, type) {
    if (! this.props.item.nextConversations) { return; }
    let nextConversations = this.props.item.nextConversations.map((nC, i) => {
      if (i !== index) { return nC; }

      return {
        ...nC,
        id,
      }
    });

    this.props.handleSaveItem({
      ...this.props.item,
      nextConversations
    })
  }

  quickReplyHandleNextItemSelect(index, id, type) {
    if (this.props.item.quick_replies) {
      let quick_replies = this.props.item.quick_replies.map((qr, i) => {
        if (i !== index) { return qr; }
        if (!id) {
          return {
            ...qr,
            payload: JSON.stringify({})
          };
        }

        return {
          ...qr,
          payload: JSON.stringify({id, type})
        };
      });
      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies
      })
    }
  }

  quickReplyHandleChangeText(index, title) {
    if (
      this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES &&
      this.props.item.quick_replies
    ) {
      if (title && title.length > QUICK_REPLY_MAX_LENGTH) {
        title = title.slice(0, QUICK_REPLY_MAX_LENGTH);
      }
      let quick_replies = this.props.item.quick_replies.map((qr, i) => {
        return i === index ?
          {
            ...qr,
            title
          } : qr;
      });
      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies
      });
    } else if (
      this.props.item.messageType === MESSAGE_TYPE_TRANSITION
    ) {
      let nextConversations = this.props.item.nextConversations.map((nC, i) => {
        return i === index ?
          {
            ...nC,
            text: title
          } : nC;
      });

      this.props.handleSaveItem({
        ...this.props.item,
        nextConversations
      })
    }
  }

  quickReplyHandleDelete(index) {

    if (
      this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES &&
      this.props.item.quick_replies
    ) {
      let quick_replies = this.props.item.quick_replies.filter((qr, i) => (
        i !== index
      ));

      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies
      });
    } else if (
      this.props.item.messageType === MESSAGE_TYPE_TRANSITION &&
      this.props.item.nextConversations
    ) {
      let nextConversations = this.props.item.nextConversations.filter((nC, i) => (
        i !== index
      ));

      this.props.handleSaveItem({
        ...this.props.item,
        nextConversations
      })
    }
  }

  quickReplyHandleAdd() {
    if (this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES) {
      let quick_replies = [];
      const newReply = {
        content_type: MESSAGE_TYPE_TEXT,
        title: ''
      };

      if (this.props.item.quick_replies) {
        quick_replies = [...this.props.item.quick_replies, newReply];
      } else {
        quick_replies = [newReply];
      }
      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies
      });
    } else if (this.props.item.messageType === MESSAGE_TYPE_TRANSITION) {
      let nextConversations = [];
      const newConvo = {
        text: '',
        id: undefined
      };

      if (this.props.item.nextConversations) {
        nextConversations = [...this.props.item.nextConversations, newConvo];
      } else {
        nextConversations = [newConvo];
      }

      this.props.handleSaveItem({
        ...this.props.item,
        nextConversations
      })
    }


  };

  render() {
    if (this.messageTypeHasDifferentOptions(this.props.item.messageType)) {
      return (
        <div className="p-2">
          <div className="d-flex flex-row justify-content-start">
            <ConversationItem
              {...this.props}
            />
            <button
              onClick={this.quickReplyHandleAdd}
              style={{fontSize: '1.5em'}}
            >+</button>
          </div>
          <div className="d-flex flex-row">
            { this.props.item.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES &&
              this.props.item.quick_replies &&
              this.props.item.quick_replies.map((qr, i) => (
              <QuickReply
                key={i}
                index={i}
                childEntities={this.props.childEntities}
                text={qr.title}
                nextId={JSON.parse(qr.payload || '{}').id}
                onUpdateText={(...params) => (
                  this.quickReplyHandleChangeText(i, ...params)
                )}
                onDeleteReply={() => this.quickReplyHandleDelete(i)}
                onNextItemSelect={this.handleNextItemSelect}
                onNewItem={() => {
                  this.props.handleChildEntityAddition(this.props.item.type, newItem => {
                    this.handleNextItemSelect(i, newItem.id, newItem.type)
                  });
                }}
                showEndOfConversation={this.props.parentItemType === TYPE_CONVERSATION}
              />
            ))}
            { this.props.item.messageType === MESSAGE_TYPE_TRANSITION &&
              this.props.item.nextConversations &&
              this.props.item.nextConversations.map((nC, i) => (
              <QuickReply
                key={i}
                index={i}
                childEntities={this.props.childEntities}
                text={nC.text}
                nextId={nC.id}
                onUpdateText={(...params) => (
                  this.quickReplyHandleChangeText(i, ...params)
                )}
                onDeleteReply={() => this.quickReplyHandleDelete(i)}
                onNextItemSelect={this.handleNextItemSelect}
                onNewItem={() => {
                  this.props.handleChildEntityAddition(this.props.item.type, newItem => {
                    this.handleNextItemSelect(i, newItem.id, newItem.type)
                  });
                }}
                messageType={this.props.item.messageType}
                conversations={this.props.conversations}
                showEndOfConversation={false}
              />
            ))}
          </div>
        </div>
      )
    }
    return (

      <ConversationItem
        className="m-2"
        {...this.props}
      />
    );
  }
}

export default ConversationItemContainer;
