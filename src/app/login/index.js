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
     return this.$http(req);
     // .success(response => {
     //    console.log('response: ', response);
     //    if(response.success === true){
     //        this.$rootScope.user = response.username;
     //        this.$rootScope.visible = true;
     //        console.log('this.$rootScope', this.$rootScope);
     //        this.$state.go('splash'); //this.$state.go('splash', { user: response.username});
     //    }else{
     //      this.$state.go('login');
     //    }
     //   return;
     // });
   }
 }
];

export const LoginCtrl = [
  '$scope', 'UserServices', '$state', '$rootScope',

  class LoginCtrl {
    constructor($scope, UserServices, $state, $rootScope) {
      this.userData = {
        username: '',
        password: ''
      };
      $scope.inputType = 'password';
      $scope.userName = '';
      $scope.password = '';
      $scope.UserServices = UserServices;
      this.$state = $state;
      this.$rootScope = $rootScope;

    $scope.checkCredentials = () =>{
      this.userData.username = $scope.userName;
      this.userData.password = $scope.password;
      console.log('userData: ', this.userData);
      UserServices.getUsers(this.userData)
        .success(response => {
          if(response.success === true){
            this.$rootScope.user = response.username;
            this.$rootScope.visible = true;
            console.log('this.$rootScope', this.$rootScope);
            this.$state.go('splash'); //this.$state.go('splash', { user: response.username});
          }else{
            this.$state.go('login');
          }
         return response.username;
        });
    };

    $scope.goToRegistration = () => {
        $state.go('registration');
      };
  }
}
]