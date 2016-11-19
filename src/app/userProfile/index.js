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
  'UserProfileServices',
  'GraphStatsServices',
  'TimerService',
  'SoundService',

  class UserProfileCtrl {
    constructor(
      $scope,
      $state,
      $rootScope,
      UserProfileServices,
      GraphStatsServices,
      TimerService,
      SoundService) {
      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      $scope.state = $state;
      $scope.UserProfileServices = UserProfileServices;
      UserProfileServices.userDataQuery();
      $scope.GraphStatsServices = GraphStatsServices;
      GraphStatsServices.graphData();

      if($rootScope.user === 'Guest'){
        $state.go('splash');
      }
    }
  }
];
