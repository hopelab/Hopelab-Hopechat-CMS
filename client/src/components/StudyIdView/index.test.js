import React from 'react';
import { shallow } from 'enzyme';
import StudyIdView from './';
import Loader from '../common/Loader';

describe('StudyIdView component', () => {
  const props = {
    readOnly: false,
    toggleReadOnly: jest.fn(),
  };
  let component;
  it('should render', () => {
    component = shallow(<StudyIdView {...props} />);
    expect(component.exists()).toBeTruthy();
    expect(component.contains(<Loader />)).toBeTruthy();
  });
  it('should render as a not-loader if there are studyIds', () => {
    props.studyIds = ['a', 'b', 'c'];
    component = shallow(<StudyIdView {...props} />);
    expect(component.exists()).toBeTruthy();
    expect(component.contains(<Loader />)).toBeFalsy();
    expect(component.contains(<ul key="a">a</ul>)).toBeTruthy();
  });
});
