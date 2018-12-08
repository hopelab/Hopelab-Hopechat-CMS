import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

class RulesDropdown extends Component {
  static propTypes = {
    rules: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
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

  renderRuleDropdownItems() {
    const { onSelection, selected, rules } = this.props;
    return rules.map(r => (
      <DropdownItem
        key={r}
        active={selected === r}
        onClick={() => onSelection(r)}
      >
        {r}
      </DropdownItem>
    ));
  }

  render() {
    const { rules, selected, disabled } = this.props;
    const foundItem = rules.find(r => r === selected) || 'choose rule';
    return (
      <Dropdown
        style={{ cursor: 'pointer' }}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          caret
          color="warning"
          onClick={this.toggle}
          disabled={disabled}
          className={`${disabled ? 'disabled' : ''}`}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          {foundItem}
        </DropdownToggle>
        <DropdownMenu flip={false}>
          {this.renderRuleDropdownItems()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}


export default RulesDropdown;
