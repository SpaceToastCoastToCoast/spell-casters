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
      HttpServices,
      TimerService,
      SoundService) {
      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.state = $state;


      //get user's game stats
      HttpServices.userDataQuery()
      .then(response => {
        $scope.totalTime = response.data.gameSummary.totalTime
        $scope.totalWords = response.data.gameSummary.totalWords
        $scope.totalGames = response.data.gameSummary.totalGames
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
