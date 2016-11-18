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
  '$scope','$state','$rootScope', 'TimerService',

  class AboutCtrl {
    constructor($scope,$state,$rootScope,TimerService) {
      TimerService.resetGame();

      if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
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