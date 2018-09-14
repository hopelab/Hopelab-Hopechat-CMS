import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

import { END_OF_CONVERSATION_ID, forms } from '../../../utils/config';

const propTypes = {
  childEntities: PropTypes.array.isRequired,
  nextId: PropTypes.string,
};

const getNextMessageOptionsForMessage = props => {
  const { onNewItem, parentItemType } = props;
  const newItems = [
    <DropdownItem divider key="divider" />,
    ...forms[parentItemType].children.map(child =>
      (
        <DropdownItem onClick={() => onNewItem(child)} key={`new-${child}`}>
          New {child}
        </DropdownItem>
      )),
  ];

  let foundActive = false;
  const items = props.childEntities.map(c => {
    const active = c.id === props.nextId;
    if (active) { foundActive = true; }
    return (
      <DropdownItem
        key={c.id}
        active={active}
        onClick={() => props.handleNextMessageSelect(c.id, c.type)}
      >
        {c.name}
      </DropdownItem>
    );
  });

  items.unshift(<DropdownItem
    key="noselection"
    active={!foundActive}
    onClick={() => props.handleNextMessageSelect()}
  >
      no selection
  </DropdownItem>); //eslint-disable-line

  if (props.showEndOfConversation) {
    items.push(<DropdownItem divider key="divider0" />);
    items.push((
      <DropdownItem
        key="end-of-conversation-xyz123"
        active={END_OF_CONVERSATION_ID === props.nextId}
        onClick={() => props.handleNextMessageSelect(END_OF_CONVERSATION_ID)}
      >
        End Of Conversation
      </DropdownItem>
    ));
  }

  items.push(...newItems);
  return items;
};

class NextMessage extends Component {
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
    const { childEntities, nextId } = this.props;
    let foundItem;
    let style = {};
    if (nextId === END_OF_CONVERSATION_ID) {
      foundItem = { name: 'End Of Conversation' };
      style = { backgroundColor: 'yellow' };
    } else {
      foundItem = childEntities.find(item => item.id === nextId);
    }


    if (foundItem) {
      foundItem = foundItem.name;
    } else {
      foundItem = 'choose next';
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

NextMessage.propTypes = propTypes;

export default NextMessage;
