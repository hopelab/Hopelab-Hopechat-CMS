import React from 'react';
import { shallow } from 'enzyme';
import RulesDropdown from './';

describe('RulesDropdown component', () => {
  const props = {
    rules: [],
    selected: '',
    onSelection: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<RulesDropdown {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
