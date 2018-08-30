import React from 'react';
import { shallow } from 'enzyme';
import DropDownWithPlus from './';

describe('DropDownWithPlus component', () => {
  const props = {
    onClickPlus: jest.fn(),
    itemType: '',
  };
  let component;
  beforeEach(() => {
    component = shallow(<DropDownWithPlus {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
