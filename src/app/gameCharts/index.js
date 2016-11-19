const template = require('./gameCharts.html');

export const GameChartsCtrlName = 'GameChartsCtrl';

export const GameChartsCtrlState = {
  url: '/game-charts',
  template,
  controller: GameChartsCtrlName,
  controllerAs: 'gameCharts',
};

export const GameChartsCtrl = [
  '$scope',
  '$state',
  '$rootScope',
  'UserProfileServices',
  'TimerService',
  'GameChartsServices',

  class DefaultCtrl {
    constructor($scope,
      $state,
      $rootScope,
      UserProfileServices,
      TimerService,
      GameChartsServices ) {
      TimerService.resetGame();

      $scope.GameChartsServices = GameChartsServices;

      if($rootScope.user === 'Guest'){
        $state.go('splash');
      }

      // GameChartsServices.userDataQuery();

    }



  }
]