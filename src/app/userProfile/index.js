const template = require('./userProfile.html');

export const UserProfileCtrlName = 'UserProfileCtrl';

export const UserProfileCtrlState ={
  url:'/userProfile',
  template,
  controller: UserProfileCtrlName,
  controllerAs: 'userProfile',
};


export const UserProfileCtrl = [
  '$scope', '$state', '$rootScope', 'UserProfileServices', 'GraphStatsServices', 'TimerService',

  class UserProfileCtrl {
    constructor($scope, $state, $rootScope, UserProfileServices, GraphStatsServices, TimerService) {
      TimerService.resetGame();


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
