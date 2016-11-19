const template = require('./splash.html');
const mainSong = require('../../public/music/Main.ogg');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default',
  params: {
    visible: false
  }
};

export const DefaultCtrl = [
  '$scope',
  '$state',
  '$stateParams',
  '$rootScope',
  'LocalStorageService',
  'TimerService',
  'SoundService',
  'ModalService',

  class DefaultCtrl {
    constructor(
      $scope,
      $state,
      $stateParams,
      $rootScope,
      LocalStorageService,
      TimerService,
      SoundService,
      ModalService) {

      TimerService.resetGame();

      if(SoundService.currentSong === undefined) {
        SoundService.setCurrentSong(mainSong);
      } else if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.goToInstructions = () => {
        $state.go('instructions');
      };
      $scope.goToActiveGame = () => {
        $state.go('active-game');
      };
      $scope.goToAbout = () => {
        $state.go('about');
      };
      $scope.goToLeaderboard = () => {
        $state.go('leaderboard')
      };
      $scope.goToLogIn = () => {
        $state.go('login')
      }

      $scope.goLogOut = () => {
        ModalService.openModal('logout')
      };

      $scope.goToUserProfile = () => {
        $state.go('userProfile')
      }

    }
  }
]