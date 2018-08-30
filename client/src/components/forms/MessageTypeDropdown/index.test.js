import React from 'react';
import { shallow } from 'enzyme';
import MessageTypeDropdown from './';

describe('MessageTypeDropdown component', () => {
  const props = {
    selected: '',
    onSelection: jest.fn(),
    onDelete: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<MessageTypeDropdown {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
