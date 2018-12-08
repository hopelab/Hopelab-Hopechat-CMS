import React from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';
import { CheckBox } from '../../common/CheckBox';

const DelayCheckbox = ({ delayChecked, delayInDays, onDelayInDaysWillFinish, onDelayChecked }) => (
  <div className="d-flex justify-content-between">
    <CheckBox
      checked={delayChecked}
      onChange={() => onDelayChecked(!delayChecked)}
      label="Delay?"
      size="16px"
    />
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

DelayCheckbox.propTypes = {
  delayChecked: PropTypes.bool.isRequired,
  delayInDays: PropTypes.string,
  onDelayChecked: PropTypes.func.isRequired,
  onDelayInDaysWillFinish: PropTypes.func.isRequired,
};

export default DelayCheckbox;
