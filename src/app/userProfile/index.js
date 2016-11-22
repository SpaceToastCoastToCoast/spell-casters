const template = require('./userProfile.html');
const mainSong = require('../../public/music/Main.ogg');

export const UserProfileCtrlName = 'UserProfileCtrl';

export const UserProfileCtrlState ={
  url:'/userProfile',
  template,
  controller: UserProfileCtrlName,
  controllerAs: 'userProfile',
};


export const UserProfileCtrl = [
  '$scope',
  '$state',
  '$rootScope',
  'HighPercentGraphServices',
  'totalWordsGraphServices',
  'BubbleGraphService',
  'HttpServices',
  'TimerService',
  'SoundService',

  class UserProfileCtrl {
    constructor(
      $scope,
      $state,
      $rootScope,
      HighPercentGraphServices,
      totalWordsGraphServices,
      BubbleGraphService,
      HttpServices,
      TimerService,
      SoundService) {
      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.state = $state;
      $scope.percentCompletedGraph = false;
      $scope.totalWordsCompletedGraph = false;
      $scope.bubbleChartGraph = true;

      $scope.showGraph = (graph)  => {
        if (graph === 'percent') {
          $scope.percentCompletedGraph = true;
          $scope.totalWordsCompletedGraph = false;
          $scope.bubbleChartGraph = false;
        } else if (graph === 'totalWords') {
          $scope.percentCompletedGraph = false;
          $scope.totalWordsCompletedGraph = true;
          $scope.bubbleChartGraph = false;
        } else {
          $scope.percentCompletedGraph = false;
          $scope.totalWordsCompletedGraph = false;
          $scope.bubbleChartGraph = true;
        }

      }



      //get user's game stats
      HttpServices.userDataQuery()
      .then(response => {
        $scope.totalTime = response.data.gameSummary.totalTime
        $scope.totalWords = response.data.gameSummary.totalWords
        $scope.totalGames = response.data.gameSummary.totalGames
        BubbleGraphService.drawingBubbleChart(response.data.gameSummary.misspelledWords);
      })

      //create user graphs
      HighPercentGraphServices.getGraphData();
      totalWordsGraphServices.getGraphData();



      if($rootScope.user === 'Guest'){
        $state.go('splash');
      }
    }
  }
];
