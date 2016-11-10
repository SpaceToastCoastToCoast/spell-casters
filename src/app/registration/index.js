const template = require('./registration.html');

export const RegistrationCtrlName = 'RegistrationCtrl';

export const RegistrationCtrlState ={
  url:'/registration',
  template,
  controller: RegistrationCtrlName,
  controllerAs: 'registration'
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
    console.log('registerData: ', registerData);
    this.data = registerData;
    const req ={
      method: 'POST',
      url: `/api/register`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `username=${registerData.username}&password=${registerData.password}&=`
     };
     console.log('req: ', req);
     return this.$http(req).success(response => {
        if(response.success === true){

        }else{

        }
       return response;
     });

  }
 }
];

export const RegistrationCtrl = [
  '$scope', '$state', 'RegistrationServices',

  class RegistrationCtrl {
    constructor($scope, $state, RegistrationServices) {
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
    }
  }
];
