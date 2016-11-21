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
  'UserProfileServices',
  'GraphStatsServices',
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
      UserProfileServices,
      GraphStatsServices,
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
      $scope.UserProfileServices = UserProfileServices;
      $scope.HighPercentGraphServices = HighPercentGraphServices;
      HighPercentGraphServices.getGraphData();
      UserProfileServices.userDataQuery();
      $scope.GraphStatsServices = GraphStatsServices;
      GraphStatsServices.totalWordsGraph();
      $scope.HttpServices = HttpServices;
      HttpServices.userDataQueryzz();

      if($rootScope.user === 'Guest'){
        $state.go('splash');
      }
    }
  }
];
