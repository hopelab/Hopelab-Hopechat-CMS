import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConversationItemContainer } from './';

describe('ConversationItemContainer component', () => {
  let props = {
    item: {},
    index: 1,
    handleSaveItem: jest.fn(),
    handleDeleteItem: jest.fn(),
    childEntities: [],
    images: [],
    videos: [],
    connectDropTarget: c => c,
    isOver: false,
    canDrop: true,
  };

  it('should render', () => {
    const component = shallow(<ConversationItemContainer {...props} />);
    expect(component.exists()).toBeTruthy();
    expect(component.find('.over').exists()).toBeFalsy();
  });

  it('if isOver is true, there should be two items rendered', () => {
    props = Object.assign({}, { ...props }, { isOver: true });
    const component = mount(<ConversationItemContainer {...props} />);
    expect(component.exists()).toBeTruthy();
    expect(component.find('.over').exists()).toBeTruthy();
  });
});
