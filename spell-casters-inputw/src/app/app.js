  import angular from 'angular';
  import * as uiRouter from 'angular-ui-router';
  import { InputBlockCtrlState, InputBlockCtrl, InputBlockCtrlName } from './inputblock';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router'])
  .config(($stateProvider) => {
    $stateProvider
      .state('inputblock', InputBlockCtrlState);    // add a state step2
  })
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .controller(InputBlockCtrlName, InputBlockCtrl);

export default MODULE_NAME;