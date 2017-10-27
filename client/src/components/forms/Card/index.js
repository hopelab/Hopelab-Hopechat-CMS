import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Button, FormControl } from 'react-bootstrap';
import MessageOptions from '../MessageOptions';

const propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEditEntity: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleUpdateMessageOptions: PropTypes.func.isRequired,
  childEntities: PropTypes.array.isRequired
};

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasEdited: false
    };
  }

  handleNameUpdate = e => {
    const name = e.target.value;

    this.props.onUpdate({
      index: this.props.index,
      field: e.target.name,
      value: name
    });

    if (this.state.hasEdited === false) {
      this.setState({
        hasEdited: true
      });
    }
  };

  saveItem = () => {
    this.props.handleSaveItem({ item: this.props.item });
  };

  onUpdate = update => {
    this.props.onUpdate(update);

    if (this.state.hasEdited === false) {
      this.setState({
        hasEdited: true
      });
    }
  };

  render() {
    return (
      <div className="Card">
        <span className="Title">{this.props.item.type}</span>

        <FormControl
          type="text"
          name="name"
          id="name"
          value={this.props.item.name}
          onChange={this.handleNameUpdate}
        />

        {this.props.item.type === 'message' ? (
          <MessageOptions
            editingAsChildEntity
            index={this.props.index}
            item={this.props.item}
            onUpdate={this.onUpdate}
          />
        ) : null}

        <div className="Actions">
          <Button
            bsStyle="primary"
            onClick={() => this.props.onEditEntity(this.props.item)}
          >
            Edit
          </Button>
          <Button
            bsStyle="success"
            onClick={this.saveItem}
            disabled={!this.state.hasEdited}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

Card.propTypes = propTypes;

export default Card;
