import React from 'react';
import { shallow } from 'enzyme';
import Form from './';
import {
  TYPE_CONVERSATION,
} from '../../../utils/config';

jest.mock('../../../utils/data');

describe('Form component', () => {
  const props = {
    childEntities: [{}],
    handleSaveItem: jest.fn(),
    handleDeleteItem: jest.fn(),
    updateStartEntity: jest.fn(),
    images: [],
    videos: [],
    tags: [],
    config: {
      fields: '',
    },
    item: {
      type: TYPE_CONVERSATION,
    },
    readOnly: false,
    setNewIndex: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = shallow(<Form {...props} />);
  });

  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });
});
