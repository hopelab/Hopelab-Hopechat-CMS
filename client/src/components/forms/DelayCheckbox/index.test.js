import React from 'react';
import { shallow } from 'enzyme';
import DelayCheckbox from './';

describe('DelayCheckbox component', () => {
  const props = {
    delayChecked: true,
    onDelayChecked: jest.fn(),
    onDelayInDaysWillFinish: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<DelayCheckbox {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
