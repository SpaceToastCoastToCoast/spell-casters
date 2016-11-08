const template = require('./game_over.html');

export const GameOverCtrlName = 'GameOverCtrl';

export const GameOverCtrlState = {
  url: '/game-over',
  template,
  controller: GameOverCtrlName,
  controllerAs: 'gameOver'
};

export const GameOverCtrl = [
  '$scope','$state',

  class GameOverCtrl {
    constructor($scope,$state) {
      $scope.goToSplash = () => {
        $state.go('splash')
      }
      $scope.goToActiveGame = () => {
        $state.go('active-game')
      }
    }
  }
]