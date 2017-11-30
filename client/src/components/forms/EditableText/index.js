import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";

class EditableText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onEditStart: PropTypes.func,
    onChange: PropTypes.func,
    onEditFinished: PropTypes.func,
    isTextArea: PropTypes.bool,
  }

  static defaultProps = {
    onEditStart() {},
    onChange() {},
    onEditFinished() {},
    isTextArea: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(e) {
    if (this.state.editing) {
      this.setState(
        {editing: false},
        this.props.onEditFinished
      );
    }
  }

  render() {
    const input = this.props.isTextArea ? (
      <textarea
        type="text"
        value={this.props.text}
        style={{width: "100%"}}
        onChange={this.props.onChange}
      />
    ) : (
      <input
        type="text"
        value={this.props.text}
        onChange={this.props.onChange}
      />
    );

    return this.state.editing ? (
      input
    ) : (
      <span onClick={() => {
        this.setState(
          prevState => ({editing:!prevState.editing}),
          () => {
            if (this.state.editing) { this.props.onEditStart(); }
            else { this.props.onEditFinished(); }
          }
        )
      }}>{this.props.text}</span>
    );
  }
}

export default onClickOutside(EditableText);
