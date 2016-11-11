const template = require('./registration.html');

export const RegistrationCtrlName = 'RegistrationCtrl';

export const RegistrationCtrlState ={
  url:'/registration',
  template,
  controller: RegistrationCtrlName,
  controllerAs: 'registration',
  params: {
    registrationMessage: null
  }
};

export const RegistrationServices = [

 '$http', '$state',

 class RegistrationServices {
  constructor ($http, $state, registeruser) {
    this.$http = $http;
    this.$state = $state;
    this.register = registeruser;
  }

  registerUser (registerData) {
    this.data = registerData;
    const req = {
      method: 'POST',
      url: `/api/register`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `username=${registerData.username}&password=${registerData.password}&=`
    };
    return this.$http(req).success(response => {
      if(response.success === true){
        this.$state.go('splash', {registrationMessage: response.registrationMessage});
      } else {
        this.$state.go('registration', {registrationMessage: response.registrationMessage});
      }
     return response;
    });
  }
}];

export const RegistrationCtrl = [
  '$scope', '$state', '$stateParams', 'RegistrationServices',

  class RegistrationCtrl {
    constructor($scope, $state, $stateParams, RegistrationServices) {
      this.registerData ={
        username: '',
        password: ''
      };

      $scope.userName = '';
      $scope.password = '';
      $scope.RegistrationServices = RegistrationServices;

      $scope.registerUser = () => {
        this.registerData.username = $scope.userName;
        this.registerData.password = $scope.password;
        RegistrationServices.registerUser(this.registerData);
      };
      $scope.registrationMessage = $stateParams.registrationMessage;
    }
  }
];
