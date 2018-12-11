import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
} from 'reactstrap';

import DnDPlaceHolder from '../../common/DND/DnDPlaceHolder';

import {
  ITEMS,
} from '../../../utils/config';


const propTypes = {
  childEntities: PropTypes.array.isRequired,
  onSelectStart: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  isIntro: PropTypes.bool,
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
    const { childEntities, onSelectStart, isIntro } = this.props;
    let foundItem = childEntities.find(item => item.start);
    if (foundItem) {
      foundItem = `Start: ${foundItem.name}`;
    } else {
      foundItem = 'no messages';
    }
    const firstItemSelect = (
      <div className="card m-2" style={{ width: '360px' }} key="origFirstIS">
        <div className="card-footer">
          <Dropdown
            style={{ cursor: 'pointer' }}
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            id="start-dropdown"
          >
            <DropdownToggle
              tag="div"
              onClick={this.toggle}
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen}
              caret
            >
              {foundItem}
            </DropdownToggle>
            <DropdownMenu flip={false}>
              {getNextMessageOptionsForMessage(childEntities, onSelectStart)}
            </DropdownMenu>
          </Dropdown>
        </div>
        {!isIntro &&
          <UncontrolledTooltip
            placement="right"
            target="start-dropdown"
            innerClassName="custom-tt"
            delay={{ hide: 50 }}
          >
          This indicates the first message of the conversation. This message serves as the daily notification.
          </UncontrolledTooltip>},
      </div>
    );
    const { connectDropTarget, isOver } = this.props;
    const array = [connectDropTarget(firstItemSelect)];
    if (isOver) array.push(<DnDPlaceHolder key="dndItem" />);
    return array;
  }
}

FirstItemSelect.propTypes = propTypes;


const conversationtItemTarget = {
  drop(props) {
    return { newIndex: props.index };
  },
};

export default DropTarget(ITEMS.CONVERSATION_ITEM, conversationtItemTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
}))(FirstItemSelect);
