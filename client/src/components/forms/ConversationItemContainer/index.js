import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationItem from '../ConversationItem';
import QuickReply from '../QuickReply';
import {
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_TEXT,
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
    onUpdate: PropTypes.func.isRequired,
    onEditEntity: PropTypes.func.isRequired,
    handleSaveItem: PropTypes.func.isRequired,
    handleUpdateMessageOptions: PropTypes.func.isRequired,
    handleChildEntityAddition: PropTypes.func,
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
  }

  messageTypeHasQuickReplies(type) {
    return type === MESSAGE_TYPE_QUESTION_WITH_REPLIES;
  }

  quickReplyHandleNextItemSelect(index, id, type) {
    if (this.props.item.quick_replies) {
      let quick_replies = this.props.item.quick_replies.map((qr, i) => {
        return i === index ?
          {
            ...qr,
            payload: JSON.stringify({id, type})
          } : qr;
      });
      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies
      })
    }
  }

  quickReplyHandleChangeText(index, title) {
    if (this.props.item.quick_replies) {
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
    }
  }

  quickReplyHandleDelete(index) {
    if (this.props.item.quick_replies) {
      let quick_replies = this.props.item.quick_replies.filter((qr, i) => (
        i !== index
      ));

      this.props.handleSaveItem({
        ...this.props.item,
        quick_replies
      });
    }
  }

  quickReplyHandleAdd() {
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
  };

  render() {
    if (this.messageTypeHasQuickReplies(this.props.item.messageType)) {
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
            { this.props.item.quick_replies &&
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
                onNextItemSelect={this.quickReplyHandleNextItemSelect}
                onNewItem={() => {
                  this.props.handleChildEntityAddition(this.props.item.type, newItem => {
                    this.quickReplyHandleNextItemSelect(i, newItem.id, newItem.type)
                  });
                }}
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
