import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';

class DelayCheckbox extends Component {
  static propTypes = {
    delayChecked: PropTypes.bool.isRequired,
    delayInDays: PropTypes.string,
    onDelayChecked: PropTypes.func.isRequired,
    onDelayInDaysWillFinish: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onDelayChecked(e.target.checked);
  }

  render() {
    const { delayChecked, delayInDays, onDelayInDaysWillFinish } = this.props;
    return (
      <div className="d-flex justify-content-between">
        <span>
          <input
            type="checkbox"
            checked={delayChecked}
            onChange={this.handleChange}
          />
          &nbsp;Delay?
        </span>
        {
          delayChecked &&
          <EditableText
            placeholder=" delay in days"
            onEditWillFinish={onDelayInDaysWillFinish}
            text={delayInDays}
          />
        }
      </div>
    );
  }
}


export default DelayCheckbox;
