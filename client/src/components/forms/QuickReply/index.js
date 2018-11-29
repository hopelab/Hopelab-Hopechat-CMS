import React from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';
import NextMessage from '../NextMessage';
import NextConversation from '../NextConversation';
import { MESSAGE_TYPE_QUESTION_WITH_REPLIES, TYPE_MESSAGE } from '../../../utils/config';

const QuickReply = ({
  text,
  onUpdateText,
  onDeleteReply,
  childEntities,
  nextId,
  index,
  onNewItem,
  conversations,
  onNextItemSelect,
  showEndOfConversation,
  messageType,
  parentItemType,
  special,
  nextType,
  messages,
  // nextChild specifies which collection or message in the next conversation to transition to
  nextChild,
}) => (
  <div className="card" style={{ width: '360px' }}>
    <div
      className="card-header d-flex flex-row justify-content-between"
      style={{
        flexWrap: 'wrap',
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      <EditableText
        text={text}
        onEditWillFinish={onUpdateText}
      />
      <button
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        onClick={onDeleteReply}
      >X
      </button>
    </div>
    <div className="card-footer">
      {
        messageType === MESSAGE_TYPE_QUESTION_WITH_REPLIES ? (
          <NextMessage
            special={special}
            parentItemType={parentItemType}
            childEntities={childEntities}
            nextId={nextId}
            handleNextMessageSelect={
              (...params) => onNextItemSelect(index, ...params)
            }
            onNewItem={onNewItem}
            showEndOfConversation={showEndOfConversation}
            nextType={nextType}
          />
        ) : (
          <div>
            <NextConversation
              conversations={conversations}
              nextId={nextId}
              handleConversationSelect={
                (...params) => onNextItemSelect(index, ...params, nextChild)
              }
            />
            <NextMessage
              special={special}
              parentItemType={parentItemType}
              childEntities={messages.filter(({ parent: { id } = {} }) => id === nextId)}
              nextId={nextChild}
              handleNextMessageSelect={
                (...params) => onNextItemSelect(index, nextId, ...params)
              }
              onNewItem={Function.prototype}
              showEndOfConversation={false}
              nextType={TYPE_MESSAGE}
            />
          </div>
        )
      }
    </div>
  </div>
);


QuickReply.propTypes = {
  nextId: PropTypes.string,
  index: PropTypes.number,
  text: PropTypes.string.isRequired,
  conversations: PropTypes.array,
  onNextItemSelect: PropTypes.func.isRequired,
  onNewItem: PropTypes.func,
  onUpdateText: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
  childEntities: PropTypes.array.isRequired,
  showEndOfConversation: PropTypes.bool.isRequired,
  messageType: PropTypes.string,
  parentItemType: PropTypes.string.isRequired,
  special: PropTypes.string,
  nextType: PropTypes.string,
  messages: PropTypes.array,
  nextChild: PropTypes.string,
};

QuickReply.defaultProps = {
  messageType: MESSAGE_TYPE_QUESTION_WITH_REPLIES,
};

export default QuickReply;
