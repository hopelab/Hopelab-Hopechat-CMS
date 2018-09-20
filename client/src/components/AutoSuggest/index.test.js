import React from 'react';
import { mount } from 'enzyme';
import AutoSuggest from './';

jest.mock('../../utils/data');

describe('main app component', () => {
  const props = {
    tags: [],
    value: '',
    ref: '',
  };
  let component;
  beforeEach(() => {
    component = mount(<AutoSuggest {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
