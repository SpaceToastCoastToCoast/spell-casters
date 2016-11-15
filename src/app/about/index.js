const template = require('./about.html');
const mainSong = require('file!../../public/music/Main.ogg');

export const AboutCtrlName = 'AboutCtrl';

export const AboutCtrlState = {
  url: '/about',
  template,
  controller: AboutCtrlName,
  controllerAs: 'about'
};

export const AboutCtrl = [
  '$scope','$state','$rootScope',

  class AboutCtrl {
    constructor($scope,$state,$rootScope) {
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