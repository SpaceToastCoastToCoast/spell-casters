const template = require('./registration.html');
const mainSong = require('../../public/music/Main.ogg');

export const RegistrationCtrlName = 'RegistrationCtrl';

export const RegistrationCtrlState ={
  url: '/registration',
  template,
  controller: RegistrationCtrlName,
  controllerAs: 'registration',
  params: {
    errorMessage: null
  }
};

export const RegistrationCtrl = [
  '$scope',
  '$state',
  '$stateParams',
  'RegistrationServices',
  '$rootScope',
  '$timeout',
  'TimerService',
  'SoundService',
  class RegistrationCtrl {
    constructor(
      $scope,
      $state,
      $stateParams,
      RegistrationServices,
      $rootScope,
      $timeout,
      TimerService,
      SoundService) {

      this.timeD = false;
      this.RegistrationServices = RegistrationServices;

      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.userName = '';
      $scope.password = '';

      $scope.goToSplash = () => {
        $state.go('splash');
      };

      $scope.registerUser = () => {
        RegistrationServices.registerUser({username: $scope.userName, password: $scope.password})
          .success(response => {
            if (response.success === true) {
              $rootScope.user = response.username;
              $rootScope.visible = true;
              if (this.timeD) {
                $timeout.cancel(timer)
              }
              this.timeD = $timeout(() => {
                $state.go('splash');
              }, 3000);
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
