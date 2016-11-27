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
  'SoundService',
  'TimerService',

  class LoginCtrl {
    constructor($scope,
      UserServices,
      $state,
      $stateParams,
      $rootScope,
      SoundService,
      TimerService) {
      'ngInject';

      this.UserServices = UserServices;

      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.userName = '';
      $scope.password = '';

    $scope.checkCredentials = () =>{
      UserServices.getUsers({username: $scope.userName, password: $scope.password})
      .success(response => {
        if (response.success) {
          $rootScope.user = response.username;
          $rootScope.visible = true;
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