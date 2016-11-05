import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { InputBoxCtrlState, InputBoxCtrl, InputBoxCtrlName } from './inputbox';
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
      .state('inputbox', InputBoxCtrlState);
  })
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .controller(InputBoxCtrlName, InputBoxCtrl);

export default MODULE_NAME;