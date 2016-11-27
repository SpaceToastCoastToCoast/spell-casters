const template = require('./game_over.html');
const mainSong = require('../../public/music/Main.ogg');

export const GameOverCtrlName = 'GameOverCtrl';

export const GameOverCtrlState = {
  url: '/game-over',
  template,
  controller: GameOverCtrlName,
  controllerAs: 'gameOver'
};


export const GameOverCtrl = [
  '$scope',
  '$state',
  '$rootScope',
  'UserStatsService',
  'TimerService',
  'SoundService',

  class GameOverCtrl {
    constructor(
      $scope,
      $state,
      $rootScope,
      UserStatsService,
      TimerService,
      SoundService) {
      'ngInject';

      TimerService.resetGame();
      $rootScope.canNavToGameOver = false;

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      if ($rootScope.user !== 'Guest') {
        UserStatsService.getLatestStats()
        .then(response => {
          $scope.username = $rootScope.user;
          $scope.totalTime = response.data.stats[response.data.stats.length-1].timeElapsed.reduce((sum,next) => {
            sum += next;
            return sum;
          },0) + ' seconds'
          $scope.totalWordsCompleted = response.data.stats[response.data.stats.length-1].totalWordsCompleted
          $scope.percentCompleted = Math.round(response.data.stats[response.data.stats.length-1].percentCompleted * 100) + '%'
          $scope.misspelledWords = response.data.stats[response.data.stats.length-1].misspelledWords.join(', ');
          $scope.score = response.data.stats[response.data.stats.length-1].score
        })
      } else {
        $scope.username = $rootScope.user;
        $scope.totalTime = $rootScope.totalTimeElapsed + ' seconds'
        $scope.totalWordsCompleted = $rootScope.totalWordsCompleted;
        $scope.percentCompleted = Math.round($rootScope.percentCompleted*100) + '%';
        $scope.score = $rootScope.score;
      }
    }
  }
]