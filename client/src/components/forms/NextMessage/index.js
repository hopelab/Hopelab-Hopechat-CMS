import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

import { END_OF_CONVERSATION_ID, forms } from '../../../utils/config';

import './style.css';

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
    let className = '';
    let brokenLink = false;
    if (nextId === END_OF_CONVERSATION_ID) {
      foundItem = { name: 'End Of Conversation' };
      className = 'bg-warning';
    } else {
      foundItem = childEntities.find(item => item.id === nextId);
    }
    if (foundItem) {
      foundItem = foundItem.name;
    } else if (!foundItem && !childEntities.length) {
      foundItem = 'choose first';
      className = 'btn btn-outline-primary btn-lg';
    } else if (nextId) {
      brokenLink = true;
      foundItem = 'Broken link, choose next (or no selection)';
      className = 'bg-danger text-light';
    } else {
      foundItem = 'choose next';
      className = 'bg-danger text-light';
    }
    return (
      <Dropdown
        style={{ cursor: 'pointer' }}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="text-center"
      >
        <DropdownToggle
          tag="div"
          onClick={this.toggle}
          data-toggle="dropdown"
          className={className}
          aria-expanded={this.state.dropdownOpen}
        >
          {foundItem}
        </DropdownToggle>
        <DropdownMenu flip={false}>
          {getNextMessageOptionsForMessage(this.props)}
        </DropdownMenu>
        {brokenLink && <div className="broken-link" >Broken Link Present</div>}
      </Dropdown>
    );
  }
}

NextMessage.propTypes = propTypes;

export default NextMessage;
