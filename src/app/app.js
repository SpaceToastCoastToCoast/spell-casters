import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { WordsService, WordsDatasetCtrlState, WordsDatasetCtrl, WordsDatasetCtrlName } from './words_dataset';
import { InstructionsCtrlState, InstructionsCtrl, InstructionsCtrlName } from './instructions';
import { TimerCtrlState, TimerCtrlName, TimerCtrl } from './timer';
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
      .state('wordsDataset', WordsDatasetCtrlState)
      .state('instructions', InstructionsCtrlState)
      .state('timer', TimerCtrlState);
  })
  .directive('app', app)
  .service('WordsService', WordsService)
  .controller('AppCtrl', AppCtrl)
  .controller(WordsDatasetCtrlName, WordsDatasetCtrl)
  .controller(InstructionsCtrlName, InstructionsCtrl)
  .controller(TimerCtrlName, TimerCtrl);

export default MODULE_NAME;