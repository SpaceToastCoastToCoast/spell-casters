import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { WordsDatasetCtrlState, WordsDatasetCtrl, WordsDatasetCtrlName } from './words_dataset';
import { WordsService } from './words_dataset/words_service'
import { InstructionsCtrlState, InstructionsCtrl, InstructionsCtrlName } from './instructions';
import { TimerCtrlState, TimerCtrlName, TimerCtrl } from './timer';
import { DefaultCtrlState, DefaultCtrlName, DefaultCtrl } from './default';
import { GameOverCtrlState, GameOverCtrlName, GameOverCtrl } from './gameOver';
import { AboutCtrlState, AboutCtrlName, AboutCtrl } from './about';
import { WonCtrlState, WonCtrlName, WonCtrl } from './won';
import { PictureToCanvasCtrlState, PictureToCanvasCtrlName, PictureToCanvasCtrl } from './pictureToCanvas';
import { UserServices, LoginCtrlState, LoginCtrlName, LoginCtrl } from './login';
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
      .state('won',WonCtrlState)
      .state('pictureToCanvas', PictureToCanvasCtrlState)
      .state('login', LoginCtrlState)

    $urlRouterProvider.otherwise('/')
  })
  .directive('app', app)
  .service('WordsService', WordsService)
  .service('UserServices', UserServices)
  .controller('AppCtrl', AppCtrl)
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(WordsDatasetCtrlName, WordsDatasetCtrl)
  .controller(TimerCtrlName, TimerCtrl)
  .controller(InstructionsCtrlName, InstructionsCtrl)
  .controller(GameOverCtrlName, GameOverCtrl)
  .controller(AboutCtrlName, AboutCtrl)
  .controller(WonCtrlName, WonCtrl)
  .controller(PictureToCanvasCtrlName, PictureToCanvasCtrl)
  .controller(LoginCtrlName, LoginCtrl)


export default MODULE_NAME;