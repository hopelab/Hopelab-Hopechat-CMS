import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ConversationItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    nextItemName: PropTypes.string,
  }

  render() {
    return (
      <div class="card ConversationItem" style={{width: '340px'}}>
        <div
          className="card-header d-flex flex-row justify-content-between"
          style={{flexWrap: "wrap"}}
        >
          {this.props.name}
          <select>
            <option value="Message">Message</option>
          </select>
        </div>
        <div className="card-block">
          <p className="card-text">
            {this.props.text}
          </p>
        </div>
        {this.props.nextItemName !== undefined ? (
            <div className="card-footer">
              {this.props.nextItemName}
            </div>
          ) : this.props.nextItemName }

      </div>
    );
  }
}

export default ConversationItem;
