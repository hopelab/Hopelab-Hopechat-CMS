import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { forms } from '../../../utils/config';
import './style.css';

const propTypes = {
  onClickPlus: PropTypes.func.isRequired,
  itemType: PropTypes.string.isRequired,
};

class DropDownWithPlus extends Component {
  constructor(props) {
    super(props);
    const options = this.getOptions(props.itemType);
    this.state = {
      selectedOption: options[0],
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemType !== this.props.itemType) {
      this.setState({ selectedOption: this.getOptions(nextProps.itemType)[0] });
    }
  }

  getOptions(itemType) {
    return R.pathOr([], [itemType, 'children'])(forms);
  }

  handleSelection(e) {
    this.setState({ selectedOption: e.target.value });
  }

  render() {
    return (
      <div className="AddButtonWrapper">
        <span
          role="button"
          tabIndex={0}
          className="Add"
          onClick={() => this.props.onClickPlus(this.state.selectedOption)}
        >
          +
        </span>
        <select
          onChange={this.handleSelection}
        >
          {this.getOptions(this.props.itemType).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    );
  }
}

DropDownWithPlus.propTypes = propTypes;

export default DropDownWithPlus;
