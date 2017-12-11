import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationItem from '../ConversationItem';
import QuickReply from '../QuickReply';
import {MESSAGE_TYPE_QUESTION_WITH_REPLIES} from '../../../utils/config';

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
    childEntities: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.quickReplyHandleNextItemSelect =
      this.quickReplyHandleNextItemSelect.bind(this);
    this.quickReplyHandleChangeText =
      this.quickReplyHandleChangeText.bind(this);
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

  render() {
    if (this.messageTypeHasQuickReplies(this.props.item.messageType)) {
      return (
        <div>
          <ConversationItem
            {...this.props}
          />
          <div className="d-flex flex-row">
            { this.props.item.quick_replies.map((qr, i) => (
              <QuickReply
                key={i}
                index={i}
                childEntities={this.props.childEntities}
                text={qr.title}
                nextId={JSON.parse(qr.payload || '{}').id}
                onUpdateText={(...params) => (
                  this.quickReplyHandleChangeText(i, ...params)
                )}
                onNextItemSelect={this.quickReplyHandleNextItemSelect}
              />
            ))}
          </div>
        </div>
      )
    }
    return (

      <ConversationItem
        {...this.props}
      />
    );
  }
}

export default ConversationItemContainer;
