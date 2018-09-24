const {
  formatNameCopy,
} = require('./general');

it('formatNameCopy should format a name-copy incrementer key correctly', () => {
  expect(formatNameCopy('name')).toEqual('copyNum:name');
});
