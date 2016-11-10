const template = require('./game_over.html');

export const GameOverCtrlName = 'GameOverCtrl';

export const GameOverCtrlState = {
  url: '/game-over',
  template,
  controller: GameOverCtrlName,
  controllerAs: 'gameOver'
};


export const GameOverCtrl = [
  '$scope','$state', '$rootScope', 'GameOverService',

  class GameOverCtrl {
    constructor($scope,$state,$rootScope, GameOverService) {
      $scope.goToSplash = () => {
        $state.go('splash')
      }
      $scope.goToActiveGame = () => {
        $state.go('active-game')
      }

      // GameOverService.setLatestStats().then(_ =>{
      //   $scope.username = $rootScope.user;
      //   const stats = GameOverService.getLatestStats()
      //   $scope.totalTime = stats.totalTimeElapsed
      //   $scope.totalWordsCompleted = stats.totalWordsCompleted
      //   $scope.percentCompleted = stats.percentCompleted

      // })

      $scope.username = $rootScope.user;
      $scope.totalTime = $rootScope.totalTimeElapsed;
      $scope.totalWordsCompleted = $rootScope.totalWordsCompleted;
      $scope.percentCompleted = $rootScope.percentCompleted;
    }
  }
]