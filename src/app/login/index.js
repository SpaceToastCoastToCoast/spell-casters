const template = require('./login.html');

export const LoginCtrlName = 'LoginCtrl';

export const LoginCtrlState = {
  url: '/login',
  template,
  controller: LoginCtrlName,
  controllerAs: 'login'
};

export const UserServices = [

 '$http', '$state',

 class UserServices {
   constructor ($http, $state, users) {
     this.$http = $http;
     this.$state = $state;
     this.users = users;
   }

   getUsers (userData) {
     this.data = userData;
     const req ={
      method: 'POST',
      url: `/api/login`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `username=${userData.username}&password=${userData.password}&=`
     };

     return this.$http(req).success(response => {
        if(response.success === true){
          this.$state.go('splash', { user: response.username});
        }else{
          this.$state.go('login');
        }
       return response.username;
     });
   }
 }
];

export const LoginCtrl = [
  '$scope', '$state', 'UserServices',

  class LoginCtrl {
    constructor($scope, $state, UserServices) {
      this.userData = {
        username: '',
        password: ''
      };
      $scope.userName = '';
      $scope.password = '';
      $scope.UserServices = UserServices;

    $scope.checkCreditinals = () =>{
      this.userData.username = $scope.userName;
      this.userData.password = $scope.password;
      UserServices.getUsers(this.userData);
    };

    $scope.goToRegistration = () => {
        $state.go('registration');
      };
    }
  }
];