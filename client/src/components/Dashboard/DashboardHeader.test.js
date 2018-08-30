import React from 'react';
import { shallow } from 'enzyme';
import DashboardHeader from './DashboardHeader';

jest.mock('../../utils/data');

describe('DashboardHeader component', () => {
  const props = {
    itemType: 'conversation',
    itemName: '',
    itemId: '',
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
    component = shallow(<DashboardHeader {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
