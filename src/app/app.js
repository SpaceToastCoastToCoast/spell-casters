import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import '../style/app.css';
import { ParsedWordCtrlState, ParsedWordCtrl, ParsedWordCtrlName } from './parsedWord';

import { WordGuessedCtrlState, WordGuessedCtrl, WordGuessedCtrlName } from './wordGuessed';

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
      .state('parsedWord', ParsedWordCtrlState);
  })
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .controller(ParsedWordCtrlName, ParsedWordCtrl)
  .controller(WordGuessedCtrlName, WordGuessedCtrl);


export default MODULE_NAME;