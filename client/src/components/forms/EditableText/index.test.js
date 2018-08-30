import React from 'react';
import { shallow } from 'enzyme';
import { EditableText } from './';

describe('EditableText component', () => {
  const props = {
    text: '',
  };
  let component;
  beforeEach(() => {
    component = shallow(<EditableText {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
