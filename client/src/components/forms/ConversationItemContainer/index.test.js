import React from 'react';
import { shallow } from 'enzyme';
import ConversationItemContainer from './';

describe('ConversationItemContainer component', () => {
  const props = {
    item: {},
    index: 1,
    handleSaveItem: jest.fn(),
    handleDeleteItem: jest.fn(),
    childEntities: [],
    images: [],
    videos: [],
  };
  let component;
  beforeEach(() => {
    component = shallow(<ConversationItemContainer {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
