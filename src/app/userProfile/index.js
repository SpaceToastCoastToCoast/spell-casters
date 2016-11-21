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
  'StatisticServices',
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
      StatisticServices,
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
      $scope.StatisticServices = StatisticServices;
      StatisticServices.getGameStatsData();
      $scope.HighPercentGraphServices = HighPercentGraphServices;
      HighPercentGraphServices.getGraphData();
      $scope.totalWordsGraphServices = totalWordsGraphServices;
      totalWordsGraphServices.getGraphData();
      $scope.HttpServices = HttpServices;
      HttpServices.userDataQueryzz();

      if($rootScope.user === 'Guest'){
        $state.go('splash');
      }
    }
  }
];
