import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

import { END_OF_CONVERSATION_ID, forms } from '../../../utils/config';
import { TYPE_STOP_NOTIFICATIONS, TYPE_BACK_TO_CONVERSATION } from '../../../utils/constants';

import './style.css';

const propTypes = {
  childEntities: PropTypes.array.isRequired,
  nextId: PropTypes.string,
  special: PropTypes.string,
  nextType: PropTypes.string,
  onNewItem: PropTypes.func.isRequired,
  parentItemType: PropTypes.string.isRequired,
  handleNextMessageSelect: PropTypes.func.isRequired,
  showEndOfConversation: PropTypes.bool,
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

  getNextMessageOptionsForMessage() {
    const { onNewItem, parentItemType, special, nextType,
      childEntities, nextId, handleNextMessageSelect, showEndOfConversation } = this.props;
    const nextTypeSelected = !!nextType;
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
    const items = childEntities.map(c => {
      const active = c.id === nextId;
      if (active || nextTypeSelected) foundActive = true;
      return (
        <DropdownItem
          key={c.id}
          active={active}
          onClick={() => handleNextMessageSelect(c.id, c.type)}
        >
          {c.name}
        </DropdownItem>
      );
    });


    if (special) {
      items.unshift(<DropdownItem divider key="divider1" />);
      items.unshift(
        <DropdownItem
          key="stop"
          active={nextType === TYPE_STOP_NOTIFICATIONS}
          onClick={() => handleNextMessageSelect(null, TYPE_STOP_NOTIFICATIONS)}
        >
        Stop All Messages
        </DropdownItem>,
      );
    }
    items.unshift(<DropdownItem
      key="noselection"
      active={special ? nextType === TYPE_BACK_TO_CONVERSATION : !foundActive}
      onClick={() => handleNextMessageSelect(null, TYPE_BACK_TO_CONVERSATION)}
    >
      {special ? 'Back To Conversation' : 'no selection'}
    </DropdownItem>); //eslint-disable-line
    if (showEndOfConversation && !special) {
      items.push(<DropdownItem divider key="divider0" />);
      items.push(
        <DropdownItem
          key="end-of-conversation-xyz123"
          active={END_OF_CONVERSATION_ID === nextId}
          onClick={() => handleNextMessageSelect(END_OF_CONVERSATION_ID)}
        >
          End Of Conversation
        </DropdownItem>,
      );
    }

    items.push(...newItems);
    return items;
  }

  render() {
    const { childEntities, nextId, nextType } = this.props;
    let foundItem;
    let className = '';
    let brokenLink = false;
    if (nextId === END_OF_CONVERSATION_ID) {
      foundItem = { name: 'End Of Conversation' };
      className = 'bg-warning';
    } else if (!nextId && nextType === TYPE_BACK_TO_CONVERSATION) {
      foundItem = { name: 'Back To Conversation' };
      className = 'bg-warning';
    } else {
      foundItem = childEntities.find(item => item.id === nextId);
    }
    if (!nextId && nextType === TYPE_STOP_NOTIFICATIONS) {
      foundItem = { name: 'Stop all Messages' };
      className = 'bg-danger';
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
          {this.getNextMessageOptionsForMessage()}
        </DropdownMenu>
        {brokenLink && <div className="broken-link" >Broken Link Present</div>}
      </Dropdown>
    );
  }
}

NextMessage.propTypes = propTypes;

export default NextMessage;
