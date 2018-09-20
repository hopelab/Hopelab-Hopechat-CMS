import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';

import { END_OF_CONVERSATION_ID } from '../../../utils/config';

const propTypes = {
  childEntities: PropTypes.array.isRequired,
  nextId: PropTypes.string,
  handleNextMessageSelect: PropTypes.func.isRequired,
  onNewItem: PropTypes.func.isRequired,
  showEndOfConversation: PropTypes.bool.isRequired
};

const defaultProps = {
  showEndOfConversation: false
};

const getNextMessageOptionsForMessage = props => {
  let foundActive = false;
  let items = props.childEntities.map((c, i) => {
    let active = c.id === props.nextId;
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

  items.unshift(
    <DropdownItem
      key="noselection"
      active={!foundActive}
      onClick={() => props.handleNextMessageSelect()}
    >
      no selection
    </DropdownItem>
  )

  if (props.showEndOfConversation) {
    items.push(<DropdownItem divider key='divider0'/>);
    items.push((
      <DropdownItem
        key='end-of-conversation-xyz123'
        active={END_OF_CONVERSATION_ID === props.nextId}
        onClick={() => props.handleNextMessageSelect(END_OF_CONVERSATION_ID)}
      >
        End Of Conversation
      </DropdownItem>
    ));
  }

  items.push(<DropdownItem divider key='divider'/>);
  items.push((
    <DropdownItem onClick={props.onNewItem} key='new-item'>
      New Item
    </DropdownItem>
  ));
  return items;
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
    let foundItem;
    let style = {};
    if (nextId === END_OF_CONVERSATION_ID) {
      foundItem = {name: "End Of Conversation"};
      style = {backgroundColor: 'yellow'};
    } else {
      foundItem = childEntities.find(item => item.id === nextId);
    }


    if (foundItem) {
      foundItem = foundItem.name;
    } else {
      foundItem = 'choose next';
      style = {backgroundColor: 'red', color: 'white'};
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
NextMessage.defaultProps = defaultProps;

export default NextMessage;
