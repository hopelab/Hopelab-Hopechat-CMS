import React from 'react';
import { shallow } from 'enzyme';
import MediaDropdown from './';

describe('MediaDropdown component', () => {
  const props = {
    media: [],
    onSelection: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<MediaDropdown {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
