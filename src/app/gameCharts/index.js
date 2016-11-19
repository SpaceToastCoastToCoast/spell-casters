const template = require('./gameCharts.html');
const mainSong = require('../../public/music/Main.ogg');

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
  '$stateParams',
  '$rootScope',
  'TimerService',
  'GameChartsServices',

  class DefaultCtrl {
    constructor($scope,$state,
      $stateParams,$rootScope,
      TimerService, GameChartsServices ) {


      GameChartsServices.userDataQuery();

    }



  }
]