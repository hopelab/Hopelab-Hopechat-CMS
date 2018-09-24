import React from 'react';
import { shallow } from 'enzyme';
import NextConversation from './';

describe('NextConversation component', () => {
  const props = {
    conversations: [],
  };
  let component;
  beforeEach(() => {
    component = shallow(<NextConversation {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
