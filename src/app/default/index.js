const template = require('./splash.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default'
};

export const DefaultCtrl = [
  '$scope','$state',

  class DefaultCtrl {
    constructor($scope,$state) {
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
        $state.go('login');
      };
    }
  }
]