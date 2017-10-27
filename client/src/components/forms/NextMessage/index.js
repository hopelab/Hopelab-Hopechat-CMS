import React from 'react';
import PropTypes from 'prop-types';

import { DropdownButton, MenuItem } from 'react-bootstrap';

const propTypes = {
  childEntities: PropTypes.array.isRequired,
  nextId: PropTypes.string,
  handleNextMessageSelect: PropTypes.func.isRequired
};

const getNextMessageOptionsForMessage = props => {
  return props.childEntities.map((c, i) => (
    <MenuItem
      key={i}
      eventKey="next"
      active={c.id === props.nextId}
      onSelect={() => props.handleNextMessageSelect('next', c)}
    >
      {c.name}
    </MenuItem>
  ));
};

const NextMessage = props => (
  <DropdownButton
    bsStyle="default"
    title="Next Message"
    key="next"
    id="next"
    className="NextMessageDropdown"
  >
    {getNextMessageOptionsForMessage(props)}
  </DropdownButton>
);

NextMessage.propTypes = propTypes;

export default NextMessage;
