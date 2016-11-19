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
      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }
      $scope.goToInstructions = () => {
        $state.go('instructions')
      }
      $scope.goToActiveGame = () => {
        $state.go('active-game')
      }
      $scope.goToSplash = () => {
        $state.go('splash')
      }
    }
  }
]