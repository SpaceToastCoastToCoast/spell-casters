const template = require('./registration.html');

export const RegistrationCtrlName = 'RegistrationCtrl';

export const RegistrationCtrlState ={
  url:'/registration',
  template,
  controller: RegistrationCtrlName,
  controllerAs: 'registration'
};

export const RegistrationCtrl = [
  '$scope', '$state',

  class RegistrationCtrl {
    constructor($scope, $state) {
      this.registerData ={
        username: '',
        password: ''
      };
      $scope.userName = '';
      $scope.password = '';

      $scope.registerUser = () => {
        this.registerData.username = $scope.userName;
        this.registerData.password = $scope.password;
        console.log('registerData: ', this.registerData);
      };


    }
  }
];
