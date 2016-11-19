const template = require('./won.html');
const mainSong = require('../../public/music/Main.ogg');

export const WonCtrlName = 'WonCtrl';

export const WonCtrlState = {
  url: '/won',
  template,
  controller: WonCtrlName,
  controllerAs: 'won'
};

export const WonCtrl = [
  '$scope','$state', '$rootScope', 'UserStatsService', 'TimerService',

  class WonCtrl {
    constructor($scope,$state,$rootScope, UserStatsService, TimerService) {
      TimerService.resetGame();

      if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
      }

      $scope.goToSplash = () => {
        $state.go('splash')
      }
      $scope.goToActiveGame = () => {
        $state.go('active-game')
      }

      if($rootScope.user !== 'Guest') {
        UserStatsService.getLatestStats()
        .then(response => {
          $scope.username = $rootScope.user;
          $scope.totalTime = response.data.stats[0].timeElapsed.reduce((sum,next) => {
            sum += next;
            return sum;
          },0) + ' seconds'
          $scope.totalWordsCompleted = response.data.stats[0].totalWordsCompleted
          $scope.percentCompleted = Math.round(response.data.stats[0].percentCompleted * 100) + '%'
          $scope.misspelledWords = response.data.stats[0].misspelledWords.join(', ');
        })
      } else {
        $scope.username = $rootScope.user;
        $scope.totalTime = $rootScope.totalTimeElapsed + ' seconds'
        $scope.totalWordsCompleted = $rootScope.totalWordsCompleted;
        $scope.percentCompleted = Math.round($rootScope.percentCompleted*100) + '%';
      }
    }
  }
]