import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { WordsService, WordsDatasetCtrlState, WordsDatasetCtrl, WordsDatasetCtrlName } from './words_dataset';
import { InstructionsCtrlState, InstructionsCtrl, InstructionsCtrlName } from './instructions';
import { TimerCtrlState, TimerCtrlName, TimerCtrl } from './timer';
import { DefaultCtrlState, DefaultCtrlName, DefaultCtrl } from './default';
import { GameOverCtrlState, GameOverCtrlName, GameOverCtrl } from './gameOver';
import { AboutCtrlState, AboutCtrlName, AboutCtrl } from './about';
import { PictureToCanvasCtrlState, PictureToCanvasCtrlName, PictureToCanvasCtrl } from './pictureToCanvas';
// import { LoadPicture } from './services/loadPicture';
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
  .config(($stateProvider,$urlRouterProvider) => {
    $stateProvider
      .state('active-game', WordsDatasetCtrlState)
      .state('timer', TimerCtrlState)
      .state('splash',DefaultCtrlState)
      .state('instructions',InstructionsCtrlState)
      .state('game-over',GameOverCtrlState)
      .state('about',AboutCtrlState)
      .state('pictureToCanvas', PictureToCanvasCtrlState)

    $urlRouterProvider.otherwise('/')
  })
  .directive('app', app)
  .service('WordsService', WordsService)
  // .service('LoadPicture', LoadPicture)
  .controller('AppCtrl', AppCtrl)
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(WordsDatasetCtrlName, WordsDatasetCtrl)
  .controller(TimerCtrlName, TimerCtrl)
  .controller(InstructionsCtrlName, InstructionsCtrl)
  .controller(GameOverCtrlName, GameOverCtrl)
  .controller(AboutCtrlName, AboutCtrl)
  .controller(PictureToCanvasCtrlName, PictureToCanvasCtrl)


export default MODULE_NAME;