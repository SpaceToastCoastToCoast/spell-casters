const template = require('./won.html');

export const WonCtrlName = 'WonCtrl';

export const WonCtrlState = {
  url: '/won',
  template,
  controller: WonCtrlName,
  controllerAs: 'won'
};

export const WonCtrl = [
  '$scope','$state', '$rootScope', 'UserStatsService',

  class WonCtrl {
    constructor($scope,$state,$rootScope, UserStatsService) {
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
    }
  }
]