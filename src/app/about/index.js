const template = require('./about.html');
const mainSong = require('../../public/music/Main.ogg');

export const AboutCtrlName = 'AboutCtrl';

export const AboutCtrlState = {
  url: '/about',
  template,
  controller: AboutCtrlName,
  controllerAs: 'about'
};

export const AboutCtrl = [
  '$scope',
  '$state',
  '$rootScope',
  'TimerService',
  'SoundService',

  class AboutCtrl {
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