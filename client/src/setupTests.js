/* eslint-disable */
import raf from '../config/raf';

import Adapter from 'enzyme-adapter-react-16.3';
import { configure } from 'enzyme';


configure({ adapter: new Adapter() });

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');


const sessionStorageMock = {
  getItem: () => true,
};

global.sessionStorage = sessionStorageMock;
global.fetch = jest.fn().mockImplementation(() => (
  new Promise(resolve => {
    resolve({
      ok: true,
      json: () => new Promise(nestedResolve => nestedResolve({})),
    });
  })
));
