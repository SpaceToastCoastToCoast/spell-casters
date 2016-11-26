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