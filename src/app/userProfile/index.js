const template = require('./userProfile.html');

export const UserProfileCtrlName = 'UserProfileCtrl';

export const UserProfileCtrlState ={
  url:'/userProfile',
  template,
  controller: UserProfileCtrlName,
  controllerAs: 'userProfile',
};


export const UserProfileCtrl = [
  '$scope', '$state', '$rootScope', 'UserProfileServices',

  class UserProfileCtrl {
    constructor($scope, $state, $rootScope, UserProfileServices) {
      $scope.state = $state;
      console.log('UserProfileServices',UserProfileServices)
      UserProfileServices.userDataQuery();

      console.log('$rootScope.user: ', $rootScope.user);
      if($rootScope.user === 'Guest'){
        $state.go('splash');
      }


    }
  }
];
