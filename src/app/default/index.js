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
  'TimerService',
  'SoundService',
  'ModalService',

  class DefaultCtrl {
    constructor(
      $scope,
      $state,
      $stateParams,
      $rootScope,
      TimerService,
      SoundService,
      ModalService) {

      'ngInject';

      TimerService.resetGame();

      if(SoundService.currentSong === undefined) {
        SoundService.setCurrentSong(mainSong);
      } else if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }
    }
  }
]