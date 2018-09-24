import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

const propTypes = {
  childEntities: PropTypes.array.isRequired,
  onSelectStart: PropTypes.func.isRequired,
};

const getNextMessageOptionsForMessage = (childEntities, onSelectStart) => {
  const oldStart = childEntities.find(c => c.start);
  const items = childEntities.map(c => (
    <DropdownItem
      key={c.id}
      active={c.start}
      onClick={() => onSelectStart(c, oldStart)}
    >
      {c.name}
    </DropdownItem>
  ));
  return items;
};

class FirstItemSelect extends Component {
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
    const { childEntities, onSelectStart } = this.props;
    let foundItem = childEntities.find(item => item.start);
    if (foundItem) {
      foundItem = `Start: ${foundItem.name}`;
    } else {
      foundItem = 'no messages';
    }
    return (
      <div className="card m-2" style={{ width: '360px' }}>
        <div className="card-footer">
          <Dropdown
            style={{ cursor: 'pointer' }}
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
              {getNextMessageOptionsForMessage(childEntities, onSelectStart)}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

FirstItemSelect.propTypes = propTypes;

export default FirstItemSelect;
