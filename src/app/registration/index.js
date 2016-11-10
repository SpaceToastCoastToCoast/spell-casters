const template = require('./registration.html');

export const RegistrationCtrlName = 'RegistrationCtrl';

export const RegistrationCtrlState ={
  url:'/registration',
  template,
  controller: RegistrationCtrlName,
  controllerAs: 'registration'
}

export const RegistrationCtrl = [

  class RegistrationCtrl {
    constructor($scope, $state) {

    }
  }
]
