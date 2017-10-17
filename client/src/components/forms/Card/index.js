import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Input from '../Input';

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
    <span>{props.item.type}</span>

    <Input
      type="text"
      name="child-name"
      id="child-name"
      value={props.item.name}
      handleInput={e => handleNameUpdate(e, props)}
    />

    <div className="Actions">
      <span onClick={() => saveItem(props)}>Save</span>
      <span onClick={() => props.onEditEntity(props.item)}>Edit</span>
    </div>
  </div>
);

Card.propTypes = propTypes;

export default Card;
