import React from 'react';
import { shallow } from 'enzyme';
import Container from '../components/Container';

describe('header component', () => {
  const props = {
    node: {},
    onClick: jest.fn(),
    onExpand: jest.fn(),
    expanded: false,
    terminal: false,
    number: 1,
  };
  let component;
  beforeEach(() => {
    component = shallow(<Container {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('should have a focus class added if it was set in focus', () => {
    expect(component.hasClass('focused')).toBeFalsy();
    component.instance().onSetFocus();
    component.update();
    expect(component.hasClass('focused')).toBeTruthy();
  });

  it('should have the correct chevron if it is/is not expanded', () => {
    expect(component.find('.fa-chevron-right')).toHaveLength(1);
    component.setProps({ expanded: true });
    expect(component.find('.fa-chevron-down')).toHaveLength(1);
  });
});
