import React from 'react';
import { shallow } from 'enzyme';
import Conversation from './';

describe('Conversation component', () => {
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
    component = shallow(<Conversation {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
