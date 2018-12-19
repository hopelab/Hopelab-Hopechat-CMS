import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './';


describe('Toggle component', () => {
  const props = {
    disabled: true,
    checked: true,
  };

  let component;
  beforeEach(() => {
    component = shallow(<Toggle {...props} />);
  });

  it('should render correctly according to props', () => {
    expect(component.exists()).toBeTruthy();
    expect(component.hasClass('disabled')).toBeTruthy();
    const input = component.find('input');
    expect(input.props().checked).toBeTruthy();
  });
});
