import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';
import NextMessage from '../NextMessage';
import './style.css';

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
    onUpdate: PropTypes.func.isRequired,
    onEditEntity: PropTypes.func.isRequired,
    handleSaveItem: PropTypes.func.isRequired,
    handleUpdateMessageOptions: PropTypes.func.isRequired,
    childEntities: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="card ConversationItem" style={{width: '340px'}}>
        <div
          className="card-header d-flex flex-row justify-content-between"
          style={{flexWrap: "wrap"}}
        >
          <EditableText text={this.props.item.name} />
          <select>
            <option value="Message">{this.props.item.type}</option>
          </select>
        </div>
        <div className="card-block">
          <p className="card-text">
            <EditableText text={this.props.item.text || ''} isTextArea={true} />
          </p>
        </div>
        {this.props.item.next ? (
            <div className="card-footer">
              <NextMessage
                childEntities={this.props.childEntities}
                nextId={this.props.item.next.id}
                handleNextMessageSelect={()=>null}
              />
            </div>
          ) : undefined }

      </div>
    );
  }
}

export default ConversationItem;
