const template = require('./userProfile.html');

export const UserProfileCtrlName = 'UserProfileCtrl';

export const UserProfileCtrlState ={
  url:'/userProfile',
  template,
  controller: UserProfileCtrlName,
  controllerAs: 'userProfile',
};


export const UserProfileCtrl = [
  '$scope', '$state', '$rootScope', 'UserProfileServices', '$q',

  class UserProfileCtrl {
    constructor($scope, $state, $rootScope, UserProfileServices, $q) {
      $scope.state = $state;
      $scope.UserProfileServices = UserProfileServices;
      UserProfileServices.userDataQuery();

      if($rootScope.user === 'Guest'){
        $state.go('splash');
      }


    }
  }
];
