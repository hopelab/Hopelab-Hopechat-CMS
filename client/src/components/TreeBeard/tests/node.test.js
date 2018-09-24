import React from 'react';
import { shallow } from 'enzyme';
import TreeNode from '../components/node';

describe('TreeNode component', () => {
  const props = {
    expanded: false,
    expandAll: false,
    node: {
      children: [{ expanded: false }, { expanded: false }],
      animations: {
        drawer: () => ({
          animation: jest.fn(),
          duration: 1,
          restAnimationInfo: {},
        }),
        toggle: jest.fn(),
      },
    },
    style: {},
    decorators: {},
    animations: {},
  };
  let component;


  it('should render', () => {
    component = shallow(<TreeNode {...props} />);
    expect(component.exists()).toBeTruthy();
    expect(component.children()).toHaveLength(2);
    expect(component.state().expanded).toBeFalsy();
  });
});
