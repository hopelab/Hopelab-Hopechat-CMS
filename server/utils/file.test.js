const {
  isSupportedFileType,
  isSupportedFont,
  fileSizeExceeds
} = require('./file');

it('isSupportedFileType', () => {
  const supportedFileType = isSupportedFileType({type: 'file'}, ['file']);
  expect(supportedFileType).toBeTruthy();
  const unSupportedFileType = isSupportedFileType({type: 'foo'}, ['file']);
  expect(unSupportedFileType).toBeFalsy();
});

it('isSupportedFont', () => {
  const supportedFont = isSupportedFont({type:'application/octet-stream'});
  expect(supportedFont).toBeTruthy();
  const unSupportedFont = isSupportedFont({type:'foo/octet-stream'});
  expect(unSupportedFont).toBeFalsy();
});

it('fileSizeExceeds', () => {
  expect(fileSizeExceeds({size: 10},1)).toBeTruthy();
});
