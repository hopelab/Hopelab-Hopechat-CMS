import React from 'react';
import { shallow } from 'enzyme';
import QuickReply from './';

describe('QuickReply component', () => {
  const props = {
    text: '',
    onNextItemSelect: jest.fn(),
    onUpdateText: jest.fn(),
    onDeleteReply: jest.fn(),
    childEntities: [],
    showEndOfConversation: true,
  };
  let component;
  beforeEach(() => {
    component = shallow(<QuickReply {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
