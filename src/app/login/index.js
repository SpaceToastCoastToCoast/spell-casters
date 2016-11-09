const template = require('./login.html');

export const LoginCtrlName = 'LoginCtrl';

export const LoginCtrlState = {
  url: '/login',
  template,
  controller: LoginCtrlName,
  controllerAs: 'login'
};

export const LoginCtrl = [
  '$scope','$state',

  class LoginCtrl {
    constructor($scope,$state) {

    }
  }
]