const template = require('./won.html');

export const WonCtrlName = 'WonCtrl';

export const WonCtrlState = {
  url: '/won',
  template,
  controller: WonCtrlName,
  controllerAs: 'won'
};

export const WonCtrl = [
  '$scope','$state',

  class WonCtrl {
    constructor($scope,$state) {
      $scope.goToSplash = () => {

        $state.go('splash')
      }
    }
  }
]