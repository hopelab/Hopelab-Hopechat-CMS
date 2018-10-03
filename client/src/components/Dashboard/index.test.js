import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './';

jest.mock('../../utils/data');

describe('DashboardHeader component', () => {
  const props = {
    itemEditing: {
      type: 'conversation',
      name: 'testConvo',
      id: '',
      parent: { type: 'foo', id: 'bar' },
    },
    isLive: true,
    isStudy: false,
    entitiesCanCopyTo: [],
    formConfig: {},
    handleDeleteItem: jest.fn(),
    handleNewChildEntity: jest.fn(),
    childEntities: [{}, {}, {}],
    handleCopyEntity: jest.fn(),
    images: [],
    videos: [],
    handleSaveItem: jest.fn(),
    onNewChildEntity: jest.fn(),
    onNameChanged: jest.fn(),
    onRuleChanged: jest.fn(),
    onDelete: jest.fn(),
    onCopy: jest.fn(),
    copyToItems: [],
    updateStartEntity: jest.fn(),
    readOnly: false,
    toggleReadOnly: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<Dashboard {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('should name a new entity correctly', () => {
    component.instance().handleChildEntityAddition();
    const args = props.handleNewChildEntity.mock.calls[0][0];
    expect(props.handleNewChildEntity).toBeCalled();
    expect(args.name).toEqual('TESTC-4');
  });
});
