import { createTreeView } from './data';
import { entities, initialState } from './config';

const { App } = initialState;

it('describeTreeView should return as expected', () => {
  const expected = { children: [], name: 'hopelab', toggled: true };
  const res = createTreeView({ active: '', data: App, entities });
  expect(res).toEqual(expected);
});
