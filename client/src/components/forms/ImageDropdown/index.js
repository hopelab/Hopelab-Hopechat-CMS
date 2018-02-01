import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'

class ImageDropdown extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      key: PropTypes.string,
    })).isRequired,
    selectedUrl: PropTypes.string,
    onSelection: PropTypes.func.isRequired,
  };

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

  renderImageDropdownItems() {
    const {onSelection, selectedUrl, images} = this.props;
    return images.map(img => {
      return (
        <DropdownItem
          key={img.url}
          active={selectedUrl === img.url}
          onClick={() => {onSelection(img.url)}}
        >
          {img.key}
        </DropdownItem>
      );
    });
  }

  render() {
    const {images, selectedUrl} = this.props;
    let foundItem = 'choose image';
    let res = images.find(img => img.url === selectedUrl);
    if (res) { foundItem = res.key; }
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
          aria-expanded={this.state.dropdownOpen}
        >
          {foundItem}
        </DropdownToggle>
        <DropdownMenu flip={false}>
          {this.renderImageDropdownItems()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ImageDropdown;
