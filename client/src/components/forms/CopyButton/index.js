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
    copyToItems: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  renderCopyToItems() {
    return this.props.copyToItems.map((item, i)=> (
      <DropdownItem key={i}>
        {item.name}
      </DropdownItem>
    ));
  }

  render() {
    const {isOpen} = this.state;
    return (
      <ButtonDropdown isOpen={isOpen} toggle={this.toggle}>
        <Button id="caret" color="primary">Copy To</Button>
        <DropdownToggle caret color="primary" />
        <DropdownMenu flip={false}>
          {this.renderCopyToItems()}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

}

export default CopyButton;
