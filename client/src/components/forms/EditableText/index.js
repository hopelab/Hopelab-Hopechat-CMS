import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";

class EditableText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onEditWillFinished: PropTypes.func,
    isTextArea: PropTypes.bool,
  }

  static defaultProps = {
    onEditWillFinish() {},
    isTextArea: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  handleClickOutside(e) {
    if (this.state.editing && e.target !== this.input) {
      this.props.onEditWillFinish(this.input.value);
      this.setState({editing: false});
    }
  }

  handleEnterKey(e) {
    if (e.keyCode === 13 &&
        this.state.editing &&
        this.input === document.activeElement) {
      this.props.onEditWillFinish(this.input.value);
      this.setState({editing: false});
    }
  }

  render() {
    const input = this.props.isTextArea ? (
      <textarea
        type="text"
        defaultValue={this.props.text}
        style={{width: "100%"}}
        onKeyUp={this.handleEnterKey}
        ref={(i) => this.input = i}
      />
    ) : (
      <input
        type="text"
        defaultValue={this.props.text}
        onKeyUp={this.handleEnterKey}
        ref={(i) => this.input = i}
      />
    );

    return this.state.editing ? (
      input
    ) : (
      <span onClick={() => {
        if (this.state.editing && this.input) {
          this.props.onEditWillFinish(this.input.value);
        }
        this.setState(prevState => ({editing:!prevState.editing}))
      }}>{this.props.text}</span>
    );
  }
}

export default onClickOutside(EditableText);
