import React from 'react';
import { shallow } from 'enzyme';
import NextMessage from './';

describe('NextMessage component', () => {
  const props = {
    childEntities: [],
  };
  let component;
  beforeEach(() => {
    component = shallow(<NextMessage {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
