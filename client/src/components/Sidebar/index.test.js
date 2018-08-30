import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './';

describe('Sidebar component', () => {
  const props = {
    addConversation: jest.fn(),
    treeData: {},
    handleTreeToggle: jest.fn(),
    toggleImageModal: jest.fn(),
    data: [],
  };
  let component;
  beforeEach(() => {
    component = shallow(<Sidebar {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
