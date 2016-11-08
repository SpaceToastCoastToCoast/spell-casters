const template = require('./about.html');

export const AboutCtrlName = 'AboutCtrl';

export const AboutCtrlState = {
  url: '/about',
  template,
  controller: AboutCtrlName,
  controllerAs: 'about'
};

export const AboutCtrl = [
  '$scope','$state',

  class AboutCtrl {
    constructor($scope,$state) {
      $scope.goToInstructions = () => {
        $state.go('instructions')
      }
      $scope.goToActiveGame = () => {
        $state.go('active-game')
      }
      $scope.goToSplash = () => {
        $state.go('splash')
      }
    }
  }
]