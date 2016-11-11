const template = require('./splash.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default',
  // params: {
  //   user: null
  // }
  params: {
    user: null,
    visible: false,
    registrationMessage: null
  }
};

export const DefaultCtrl = [
  '$scope','$state', '$stateParams', '$rootScope',

  class DefaultCtrl {
    constructor($scope,$state,$stateParams,$rootScope) {
      $scope.goToInstructions = () => {
        $state.go('instructions');
      };
      $scope.goToActiveGame = () => {
        $state.go('active-game');
      };
      $scope.goToAbout = () => {
        $state.go('about');
      };
      $scope.goToLogIn = () => {
        $state.go('login')
      }
      //$scope.user = $stateParams.user;
      $scope.LogOut = () => {
        $rootScope.user = 'Guest';
        $rootScope.visible = false;
        $state.go('splash')
      };
      $scope.registrationMessage = $stateParams.registrationMessage;

      $scope.goToUserProfile = () => {
        $state.go('userProfile')
      }
    }
  }
]