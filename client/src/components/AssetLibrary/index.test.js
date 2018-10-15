import React from 'react';
import { shallow } from 'enzyme';
import { CardBody } from 'reactstrap';

import AssetLibrary from './';

jest.mock('../../utils/data');

describe('DashboardHeader component', () => {
  const props = {
    toggleImageModal: jest.fn(),
    deleteMedia: jest.fn(),
    renameFile: jest.fn(),
    assets: [],

  };
  let component;
  beforeEach(() => {
    component = shallow(<AssetLibrary {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
    expect(component.find(CardBody)).toHaveLength(0);
  });

  it('should display images correctly', () => {
    component.setProps({ assets: [{ key: '', url: '' }] });
    expect(component.find(CardBody)).toHaveLength(1);
  });
});
