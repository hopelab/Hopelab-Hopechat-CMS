
export const createInitialEntityState = jest.fn().mockReturnValue({});

export const getEntitiesCanCopyTo = jest.fn().mockReturnValue([]);
export const getChildEntitiesFor = jest.fn().mockReturnValue([]);
export const createTreeView = jest.fn().mockReturnValue({});
const fetchAllDataForAppMock = jest.fn().mockReturnValue(new Promise(resolve => resolve()));

export const fetchAllDataForApp = fetchAllDataForAppMock;
