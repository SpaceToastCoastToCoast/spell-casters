const template = require('./gameCharts.html');
const mainSong = require('../../public/music/Main.ogg');

export const GameChartsCtrlName = 'GameChartsCtrl';

export const GameChartsCtrlState = {
  url: '/game-charts',
  template,
  controller: GameChartsCtrlName,
  controllerAs: 'game-charts',
  params: {
    visible: false
  }
};

export const GameChartsCtrl = [
  '$scope','$state','$stateParams','$rootScope','TimerService',

  class DefaultCtrl {
    constructor($scope,$state,$stateParams,$rootScope, TimerService) {

      if($rootScope.currentSong === undefined) {
        $rootScope.setCurrentSong(mainSong);
      } else if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
      }






    }
  }
]