const template = require('./game_over.html');
const mainSong = require('file!../../public/music/Main.ogg');

export const GameOverCtrlName = 'GameOverCtrl';

export const GameOverCtrlState = {
  url: '/game-over',
  template,
  controller: GameOverCtrlName,
  controllerAs: 'gameOver'
};


export const GameOverCtrl = [
  '$scope','$state', '$rootScope', 'UserStatsService',

  class GameOverCtrl {
    constructor($scope,$state,$rootScope, UserStatsService) {
      if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
      }

      $scope.goToSplash = () => {
        $state.go('splash')
      }
      $scope.goToActiveGame = () => {
        $state.go('active-game')
      }

      $scope.username = $rootScope.user;
      $scope.totalTime = $rootScope.totalTimeElapsed;
      $scope.totalWordsCompleted = $rootScope.totalWordsCompleted;
      $scope.percentCompleted = $rootScope.percentCompleted;
      $scope.misspelledWords = $rootScope.misspelledWords;
    }
  }
]