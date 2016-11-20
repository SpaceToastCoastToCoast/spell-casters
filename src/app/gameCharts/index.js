const template = require('./gameCharts.html');

export const GameChartsCtrlName = 'GameChartsCtrl';

export const GameChartsCtrlState = {
  url: '/gamecharts',
  template,
  controller: GameChartsCtrlName,
  controllerAs: 'gamecharts',
};

export const GameChartsCtrl = [
  '$scope',
  '$state',
  '$rootScope',
  'GameChartsServices',

  class GameChartsCtrl {
    constructor(
      $scope,
      $state,
      $rootScope,
      GameChartsServices ) {
      // TimerService.resetGame();

      $scope.GameChartsServices = GameChartsServices;


      $scope.data = GameChartsServices.userDataQuery()



    }



  }
]