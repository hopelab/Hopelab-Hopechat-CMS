import React from 'react';
import { shallow } from 'enzyme';
import { DropdownItem } from 'reactstrap';

import NextMessage from './';

describe('NextMessage component', () => {
  const props = {
    childEntities: [],
    parentItemType: 'conversation',
    onNewItem: jest.fn(),
    handleNextMessageSelect: jest.fn(),
  };
  let component;

  it('should render', () => {
    component = shallow(<NextMessage {...props} />);
    expect(component.exists()).toBeTruthy();
    const dropDownItems = component.find(DropdownItem);
    expect(dropDownItems).toHaveLength(4);
  });

  it('should correct number of dropdown options depending on parent type', () => {
    props.parentItemType = 'block';
    component = shallow(<NextMessage {...props} />);
    expect(component.exists()).toBeTruthy();
    const dropDownItems = component.find(DropdownItem);
    expect(dropDownItems).toHaveLength(3);
  });
});
