const template = require('./splash.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default',
  params: {user: null}
};

export const DefaultCtrl = [
  '$scope','$state', '$stateParams',

  class DefaultCtrl {
    constructor($scope,$state, $stateParams) {
      $scope.goToInstructions = () => {
        $state.go('instructions')
      }
      $scope.goToActiveGame = () => {
        $state.go('active-game')
      }
      $scope.goToAbout = () => {
        $state.go('about')
      }
      $scope.goToLogIn = () => {
        $state.go('login')
      },
      $scope.user = $stateParams.user;
    }
  }
]