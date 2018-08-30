import React from 'react';
import { shallow } from 'enzyme';
import CopyButton from './';

describe('ConversationItemContainer component', () => {
  const props = {
    item: {},
    index: 1,
    handleSaveItem: jest.fn(),
    handleDeleteItem: jest.fn(),
    childEntities: [],
    images: [],
    videos: [],
    onCopy: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<CopyButton {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
