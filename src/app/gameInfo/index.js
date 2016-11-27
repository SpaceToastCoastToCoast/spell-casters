const template = require('./gameInfo.html');
const mainSong = require('../../public/music/Main.ogg');

export const GameInfoCtrlName = 'GameInfoCtrl';

export const GameInfoCtrlState = {
  url: '/gameInfo',
  template,
  controller: GameInfoCtrlName,
  controllerAs: 'gameInfo'
};

export const GameInfoCtrl = [
  '$scope',
  '$state',
  '$rootScope',
  'TimerService',
  'SoundService',

  class GameInfoCtrl {
    constructor(
      $scope,
      $state,
      $rootScope,
      TimerService,
      SoundService) {
      'ngInject';

      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

    }
  }
]