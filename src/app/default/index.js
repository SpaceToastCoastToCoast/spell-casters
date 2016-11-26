const template = require('./splash.html');
const mainSong = require('../../public/music/Main.ogg');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default',
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

      $scope.visible = ($rootScope.user !== 'Guest');

      if(SoundService.currentSong === undefined) {
        SoundService.setCurrentSong(mainSong);
      } else if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.goLogOut = () => {
        ModalService.openModal('logout');
      };
    }
  }
]