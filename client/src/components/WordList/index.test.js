import React from 'react';
import { shallow } from 'enzyme';
import WordList from './';

describe('WordList component', () => {
  const props = {
    special: '',
  };
  let component;
  beforeEach(() => {
    component = shallow(<WordList {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
