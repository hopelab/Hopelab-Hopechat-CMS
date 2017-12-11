import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationItem from '../ConversationItem';
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

  messageTypeHasQuickReplies(type) {
    return type === MESSAGE_TYPE_QUESTION_WITH_REPLIES;
  }

  render() {
    if (this.messageTypeHasQuickReplies(this.props.item.messageType)) {
      return (
        <div>
          <ConversationItem
            {...this.props}
          />
          {JSON.stringify(this.props.item.quick_replies)}
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
