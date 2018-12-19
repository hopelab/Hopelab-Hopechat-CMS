import React from 'react';
import { shallow } from 'enzyme';
import Container from '../components/Container';

const props = {
  node: {},
  onClick: jest.fn(),
  onExpand: jest.fn(),
  expanded: false,
  terminal: false,
  level: 1,
};

describe('header component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Container {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('should have the correct chevron if it is/is not expanded', () => {
    expect(component.find('.fa-caret-right')).toHaveLength(1);
    component.setProps({ expanded: true });
    expect(component.find('.fa-caret-down')).toHaveLength(1);
  });
});

describe('selected header component', () => {
  it('should have a default class added if it was selected', () => {
    const newProps = Object.assign({}, props, { selected: true });
    const component = shallow(<Container {...newProps} />);
    // have to use render() due to https://github.com/airbnb/enzyme/issues/1177
    expect(component.render().hasClass('btn-default')).toBeTruthy();
  });
});
