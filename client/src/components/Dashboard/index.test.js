import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './';

jest.mock('../../utils/data');

describe('DashboardHeader component', () => {
  const props = {
    itemEditing: {
      type: 'conversation',
      name: '',
      id: '',
    },
    isLive: true,
    isStudy: false,
    entitiesCanCopyTo: [],
    formConfig: {},
    handleDeleteItem: jest.fn(),
    handleNewChildEntity: jest.fn(),
    handleAddTag: jest.fn(),
    childEntities: [],
    handleCopyEntity: jest.fn(),
    images: [],
    videos: [],
    tags: [],
    handleSaveItem: jest.fn(),
    onNewChildEntity: jest.fn(),
    onNameChanged: jest.fn(),
    onRuleChanged: jest.fn(),
    onDelete: jest.fn(),
    onCopy: jest.fn(),
    copyToItems: [],
  };
  let component;
  beforeEach(() => {
    component = shallow(<Dashboard {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
