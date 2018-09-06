import React from 'react';
import { shallow } from 'enzyme';
import Container from '../components/Container';

describe('header component', () => {
  const props = {
    node: {},
    onClick: jest.fn(),
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
});
