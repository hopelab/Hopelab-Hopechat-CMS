import React from 'react';
import { shallow } from 'enzyme';
import MediaPreview from './';

describe('MediaPreview component', () => {
  const props = {
    url: '',
    type: 'image',
  };
  let component;
  beforeEach(() => {
    component = shallow(<MediaPreview {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
