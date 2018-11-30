import { initialState } from '../config';

const { App } = initialState;
export const createInitialEntityState = jest.fn().mockReturnValue({});

export const getEntitiesCanCopyTo = jest.fn().mockReturnValue([]);
export const getChildEntitiesFor = jest.fn().mockReturnValue([]);
export const createTreeView = jest.fn().mockReturnValue({});
export const entityCanBeCopied = jest.fn().mockReturnValue(true);
export const createInitialFormState = jest.fn().mockReturnValue(true);

const updatedConvo = App.conversation.slice();
updatedConvo.push({ id: 'foo', type: 'bar' });

const convoPostRes = Object.assign(
  {},
  { ...App },
  { conversation: updatedConvo },
);
export const post = jest.fn().mockReturnValue(new Promise(resolve =>
  resolve({ json: () => convoPostRes })));

export const updateStart = jest.fn().mockReturnValue(new Promise(resolve =>
  resolve({ messages: [] })));

const fetchAllDataForAppMock = jest.fn().mockReturnValue(new Promise(resolve => resolve()));
export const fetchAllDataForApp = fetchAllDataForAppMock;
