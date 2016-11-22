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
  '$rootScope',
  'GameChartsServices',
  'BubbleChartDataServices',
  'HttpGameStatsServices',

  class GameChartsCtrl {
    constructor(
      $scope,
      $rootScope,
      GameChartsServices,
      BubbleChartDataServices,
      HttpGameStatsServices) {

      this.GameChartsServices =GameChartsServices;
      this.BubbleChartDataServices = BubbleChartDataServices;

      HttpGameStatsServices.userDataQuery()
      .then(
        this.BubbleChartDataServices.makingDataSets
        )
      .then(
        this.GameChartsServices.drawingBubbleChart
        )
    }

  }];