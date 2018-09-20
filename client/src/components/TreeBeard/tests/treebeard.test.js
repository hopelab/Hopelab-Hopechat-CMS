import React from 'react';
import { shallow } from 'enzyme';
import treebeard from '../components/treebeard';

describe('treebeard component', () => {
  const props = {
    expandAll: false,
  };
  let component;
  beforeEach(() => {
    component = shallow(<treebeard {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
