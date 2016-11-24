const template = require('./login.html');
const mainSong = require('../../public/music/Main.ogg');

export const LoginCtrlName = 'LoginCtrl';

export const LoginCtrlState = {
  url: '/login',
  template,
  controller: LoginCtrlName,
  controllerAs: 'login',
  params: {
    errorMessage: null
  }
};

export const UserServices = [
 '$http',
 '$state',

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
      return this.$http(req)
        .success(response => {
          if(response.success === true){
            this.$state.go('splash');
          } else {
            this.$state.go('login', {errorMessage: response.errorMessage});
          }
          return;
        });
    }
  }
];

export const LoginCtrl = [
  '$scope',
  'UserServices',
  '$state',
  '$stateParams',
  '$rootScope',
  'LocalStorageService',
  'SoundService',

  class LoginCtrl {
    constructor($scope,
      UserServices,
      $state,
      $stateParams,
      $rootScope,
      LocalStorageService,
      SoundService) {

      this.UserServices = UserServices;

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.userName = '';
      $scope.password = '';

    $scope.checkCredentials = () =>{
      UserServices.getUsers({username: $scope.userName, password: $scope.password})
        .success(response =>{
          if (response.success) {
            $rootScope.user = response.username;
            $rootScope.userLink = `${response.username} | Profile`;
            $rootScope.visible = true;
            LocalStorageService.setData('user', {userId: response.userid, userName: response.username});
          } else {
            $scope.userName = '';
            $scope.password = '';
          }
        })
    };
    $scope.errorMessage = $stateParams.errorMessage;

  }
}
];