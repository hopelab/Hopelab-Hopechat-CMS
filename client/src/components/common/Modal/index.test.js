import React from 'react';
import { shallow } from 'enzyme';
import Modal from './';


describe('DashboardHeader component', () => {
  const props = {
    header: <p />,
    text: <p />,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<Modal {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
