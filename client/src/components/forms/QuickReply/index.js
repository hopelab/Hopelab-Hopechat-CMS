import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';
import NextMessage from '../NextMessage';
import NextConversation from '../NextConversation';
import { MESSAGE_TYPE_QUESTION_WITH_REPLIES } from '../../../utils/config';

class QuickReply extends Component {
  static propTypes = {
    nextId: PropTypes.string,
    index: PropTypes.number,
    text: PropTypes.string.isRequired,
    messageType: PropTypes.string,
    onNextItemSelect: PropTypes.func.isRequired,
    onNewItem: PropTypes.func,
    onUpdateText: PropTypes.func.isRequired,
    onDeleteReply: PropTypes.func.isRequired,
    childEntities: PropTypes.array.isRequired,
    showEndOfConversation: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    messageType: MESSAGE_TYPE_QUESTION_WITH_REPLIES
  }

  render() {
    return (
      <div className="card" style={{width: '360px'}}>
        <div
          className="card-header d-flex flex-row justify-content-between"
          style={{
            flexWrap: "wrap",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <EditableText
            text={this.props.text}
            onEditWillFinish={this.props.onUpdateText}
          />
          <button
            style={{border: 'none', background: 'none', cursor: 'pointer'}}
            onClick={this.props.onDeleteReply}
          >X</button>
        </div>
        <div className="card-footer">
          {
            this.props.messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES ? (
              <NextMessage
                childEntities={this.props.childEntities}
                nextId={this.props.nextId}
                handleNextMessageSelect={
                  (...params) => this.props.onNextItemSelect(this.props.index, ...params)
                }
                onNewItem={this.props.onNewItem}
                showEndOfConversation={this.props.showEndOfConversation}
              />
            ) : (
              <NextConversation
                conversations={this.props.conversations}
                nextId={this.props.nextId}
                handleConversationSelect={
                  (...params) => this.props.onNextItemSelect(this.props.index, ...params)
                }
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default QuickReply;
