import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { WordsService, WordsDatasetCtrlState, WordsDatasetCtrl, WordsDatasetCtrlName } from './words_dataset';
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


angular.module(MODULE_NAME, ['ui.router'])
  .config(($stateProvider) => {
    $stateProvider
      .state('wordsDataset', WordsDatasetCtrlState);
  })
  .directive('app', app)
  .service('WordsService', WordsService)
  .controller('AppCtrl', AppCtrl)
  .controller(WordsDatasetCtrlName, WordsDatasetCtrl);

export default MODULE_NAME;