import React from 'react';
import { shallow } from 'enzyme';
import decorators from '../components/decorators';

describe('decorators component', () => {
  const props = {

  };
  let component;
  beforeEach(() => {
    component = shallow(<decorators {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
