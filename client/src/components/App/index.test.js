import React from 'react';
import { shallow } from 'enzyme';

import App from './';
jest.mock('../../utils/data');

describe('main app component', () => {
    const props = {};
    it('should render', () => {
      const app = shallow(<App {...props} />);
      expect(app.exists()).toBeTruthy()
  });
});

// it('should not render an input if pwRecoveryEmail exists', () => {
//     const props = {
//         requestNewPassword: jest.fn(),
//         pwRecoveryEmail: 'test@email.com',
//         emailExists: true,
//     };
//     const forgotPassword = mount(<ForgotPassword {...props} />);
//     expect(forgotPassword.hasClass('ForgotPassword')).toBeTruthy();
//     expect(forgotPassword.find('input').length).toBe(0);
// });
