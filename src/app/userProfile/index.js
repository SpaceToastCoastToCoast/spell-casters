const template = require('./userProfile.html');

export const UserProfileCtrlName = 'UserProfileCtrl';

export const UserProfileCtrlState ={
  url:'/userProfile',
  template,
  controller: UserProfileCtrlName,
  controllerAs: 'userProfile',
};



export const UserProfileCtrl = [
  '$scope', '$state', '$rootScope',

  class UserProfileCtrl {
    constructor($scope, $state, $rootScope) {
      $scope.state = $state;

      console.log('$rootScope.user: ', $rootScope.user);
      if($rootScope.user === 'Guest'){
        console.log('foo: ');
        $state.go('splash');
      }

    }
  }
];
