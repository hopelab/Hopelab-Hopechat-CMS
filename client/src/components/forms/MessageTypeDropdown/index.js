import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import { messageTypes } from '../../../utils/config';


class MessageTypeDropdown extends Component {
  static propTypes = {
    selected: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

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

  renderMessageTypeDropdownItems() {
    const { onSelection, selected, onDelete } = this.props;
    const types = messageTypes.map(m => (
      <DropdownItem
        key={m.id}
        active={selected === m.id}
        onClick={() => onSelection(m.id)}
      >
        {m.display}
      </DropdownItem>
    ));

    types.push((
      <DropdownItem
        key="DELETE"
        onClick={onDelete}
        style={{ color: 'red', fontWeight: '900' }}
      >
        Delete
      </DropdownItem>
    ));

    return types;
  }

  render() {
    const { selected } = this.props;
    const foundItem = messageTypes.find(m => m.id === selected) || { display: 'type' };
    return (
      <Dropdown
        style={{ cursor: 'pointer' }}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          tag="div"
          caret
          onClick={this.toggle}
          className="pl-2 pr-2"
          style={{
            backgroundColor: '#757f86',
            borderRadius: '20px',
            color: 'white',
          }}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          {foundItem.display}
        </DropdownToggle>
        <DropdownMenu flip={false}>
          {this.renderMessageTypeDropdownItems()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default MessageTypeDropdown;
