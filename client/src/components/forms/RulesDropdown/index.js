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
    const { rules, selected } = this.props;
    const foundItem = rules.find(r => r === selected) || 'choose rule';
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
          className="pt-1 pb-1 pl-2 pr-2"
          style={{
            border: '1px solid  #c6c6c6',
            backgroundColor: '#e2e2e2',
            borderRadius: '5px',
          }}
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
