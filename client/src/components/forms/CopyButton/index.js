import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class CopyButton extends Component {
  static propTypes = {
    copyToItems: PropTypes.arrayOf(PropTypes.object),
    onCopy: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderCopyToItems() {
    const { copyToItems, onCopy } = this.props;
    return copyToItems.map((item, i) => (
      <DropdownItem onClick={() => onCopy(item)} key={i}>
        {item.name}
      </DropdownItem>
    ));
  }

  render() {
    const { isOpen } = this.state;
    const { copyToItems, onCopy, disabled } = this.props;

    return copyToItems ? (
      <ButtonDropdown isOpen={isOpen} toggle={this.toggle} >
        <Button
          disabled={disabled}
          id="caret"
          onClick={this.toggle}
          color="info"
        >
          Copy To
        </Button>
        <DropdownToggle caret color="info" disabled={disabled} />
        <DropdownMenu flip={false}>
          {this.renderCopyToItems()}
        </DropdownMenu>
      </ButtonDropdown>
    ) : (
      <Button color="info" onClick={onCopy} disabled={disabled}>Copy</Button>
    );
  }
}

export default CopyButton;
