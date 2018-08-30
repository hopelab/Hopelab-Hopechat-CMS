import React from 'react';
import { shallow } from 'enzyme';
import UploadModal from './';

describe('UploadModal component', () => {
  const props = {
    isOpen: true,
    onHide: jest.fn(),
    onUpload: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<UploadModal {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
