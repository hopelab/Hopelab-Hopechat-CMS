import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

const propTypes = {
  conversations: PropTypes.array.isRequired,
  nextId: PropTypes.string,
};

const defaultProps = {
  nextId: undefined,
};

const getNextMessageOptionsForMessage = props => {
  let foundActive = false;
  const items = props.conversations.map(c => {
    const active = c.id === props.nextId;
    if (active) { foundActive = true; }
    return (
      <DropdownItem
        key={c.id}
        active={active}
        onClick={() => props.handleConversationSelect(c.id, c.type)}
      >
        {c.name}
      </DropdownItem>
    );
  });

  items.unshift(<DropdownItem
    key="noselection"
    active={!foundActive}
    onClick={() => props.handleConversationSelect()}
  >
      no selection
  </DropdownItem>); //eslint-disable-line

  return items;
};

class NextConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
    const { conversations, nextId } = this.props;
    let foundItem;
    let style = {};
    if (conversations) {
      foundItem = conversations.find(item => item.id === nextId);
    }


    if (foundItem) {
      foundItem = foundItem.name;
    } else {
      foundItem = 'choose conversation';
      style = { backgroundColor: 'red', color: 'white' };
    }
    return (
      <Dropdown
        style={{ cursor: 'pointer' }}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          tag="div"
          onClick={this.toggle}
          data-toggle="dropdown"
          style={style}
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

NextConversation.propTypes = propTypes;
NextConversation.defaultProps = defaultProps;

export default NextConversation;
