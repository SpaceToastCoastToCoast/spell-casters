const template = require('./login.html');

export const LoginCtrlName = 'LoginCtrl';

export const LoginCtrlState = {
  url: '/login',
  template,
  controller: LoginCtrlName,
  controllerAs: 'login'
};

export const LoginCtrl = [
  '$scope',

  class LoginCtrl {
    constructor($scope) {
      this.userData = {
        username: '',
        password: ''
      };
      $scope.userName = '';
      $scope.password = '';

    $scope.checkCreditinals = () =>{
      this.userData.username = $scope.userName;
      this.userData.password = $scope.password;
      console.log('userData: ', this.userData);
    };
    }
  }
]

