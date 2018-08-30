import React from 'react';
import { mount } from 'enzyme';
import App from './';

jest.mock('../../utils/data');

describe('main app component', () => {
  const props = {};
  let app;
  beforeEach(() => {
    app = mount(<App {...props} />);
  });

  it('should render', () => {
    expect(app.exists()).toBeTruthy();
  });

  it('should toggle image model', () => {
    expect(app.state().showImageModal).toBeFalsy();
    app.instance().toggleImageModal();
    expect(app.state().showImageModal).toBeTruthy();
  });

  it('should add Conversations', async () => {
    await expect(app.state().conversation[0]).toBeUndefined();
    await app.instance().addConversation();
    await app.update();
    await expect(app.state().conversation[0]).not.toBeUndefined();
  });

  it('should add images/videos', async () => {
    await expect(app.state().video[0]).toBeUndefined();
    await app.instance().addImage([{}]);
    await app.update();
    await expect(app.state().imageUploadStatus).toBeTruthy();
    await expect(app.state().video[0]).not.toBeUndefined();
  });

  it('updateStartEntity', async () => {
    await expect(app.state().video[0]).toBeUndefined();
    await app.instance().updateStartEntity('conversation');
    await app.update();
    await expect(app.state().message).toEqual({});
  });

  it('handles Tree Toggle', async () => {
    await expect(app.state().video[0]).toBeUndefined();
    await app.instance().handleTreeToggle({ node: {}, expand: true });
    await app.update();
    await expect(app.state().cursor).toEqual({});
    await app.instance().handleTreeToggle({ node: { foo: 'bar' } });
    await expect(app.state().cursor).toEqual({ foo: 'bar', active: true });
  });
});
