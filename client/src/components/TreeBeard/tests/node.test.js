import React from 'react';
import { shallow } from 'enzyme';
import node from '../components/node';

describe('node component', () => {
  const props = {

  };
  let component;
  beforeEach(() => {
    component = shallow(<node {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
