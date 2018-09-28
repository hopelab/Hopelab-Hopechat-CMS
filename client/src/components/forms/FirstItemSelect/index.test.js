import React from 'react';
import { shallow } from 'enzyme';
import FirstItemSelect from './';

describe('FirstItemSelect component', () => {
  const props = {
    childEntities: [],
    onSelectStart: jest.fn(),
    connectDropTarget: jest.fn(),
    isOver: false,
  };
  let component;
  beforeEach(() => {
    component = shallow(<FirstItemSelect {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
