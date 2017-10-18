import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Button, FormControl } from 'react-bootstrap';

const propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onNameUpdate: PropTypes.func.isRequired,
  onEditEntity: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired
};

const handleNameUpdate = (e, props) => {
  const name = e.target.value;

  props.onNameUpdate(props.index, name);
};

const saveItem = props => {
  props.handleSaveItem(props.item, false);
};

const Card = props => (
  <div className="Card">
    <span className="Title">{props.item.type}</span>

    <FormControl
      type="text"
      name="child-name"
      id="child-name"
      value={props.item.name}
      onChange={e => handleNameUpdate(e, props)}
    />

    <div className="Actions">
      <Button bsStyle="primary" onClick={() => props.onEditEntity(props.item)}>
        Edit
      </Button>
      <Button bsStyle="success" onClick={() => saveItem(props)}>
        Save
      </Button>
    </div>
  </div>
);

Card.propTypes = propTypes;

export default Card;
