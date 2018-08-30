import React from 'react';
import { shallow } from 'enzyme';
import header from '../components/header';

describe('header component', () => {
  const props = {

  };
  let component;
  beforeEach(() => {
    component = shallow(<header {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
