import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';

const propTypes = {
  childEntities: PropTypes.array.isRequired,
  nextId: PropTypes.string,
  handleNextMessageSelect: PropTypes.func.isRequired
};

const getNextMessageOptionsForMessage = props => {
  return props.childEntities.map((c, i) => (
    <DropdownItem
      key={c.id}
      eventKey="next"
      active={c.id === props.nextId}
      onClick={() => props.handleNextMessageSelect('next', c)}
    >
      {c.name}
    </DropdownItem>
  ));
};

class NextMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }

  render() {
    const { childEntities, nextId } = this.props;
    let foundItem = childEntities.find(item => item.id === nextId);
    if (foundItem) {
      foundItem = foundItem.name;
    } else {
      foundItem = 'blah';
    }
    return (
      <Dropdown
        style={{cursor: 'pointer'}}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          tag="div"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          {foundItem}
        </DropdownToggle>
        <DropdownMenu flip={false}>
          {getNextMessageOptionsForMessage(this.props)}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

NextMessage.propTypes = propTypes;

export default NextMessage;
