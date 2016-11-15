import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { WordsDatasetCtrlState, WordsDatasetCtrl, WordsDatasetCtrlName } from './words_dataset';
import { WordsService } from './words_dataset/words_service';
import { TimerService } from './words_dataset/timer_service';
import { numberToString } from './constants/numberToString';
import { UserStatsService } from './gameOver/game_over_service';
import { InstructionsCtrlState, InstructionsCtrl, InstructionsCtrlName } from './instructions';
import { DefaultCtrlState, DefaultCtrlName, DefaultCtrl } from './default';
import { GameOverCtrlState, GameOverCtrlName, GameOverCtrl } from './gameOver';
import { AboutCtrlState, AboutCtrlName, AboutCtrl } from './about';
import { WonCtrlState, WonCtrlName, WonCtrl } from './won';
import { UserServices, LoginCtrlState, LoginCtrlName, LoginCtrl } from './login';
import { RegistrationServices, RegistrationCtrlState, RegistrationCtrlName, RegistrationCtrl } from './registration';
import { LocalStorageService } from './services/localStorage_service';
import '../style/app.css';
const bossSong = require('file!../public/music/Boss_fight.ogg');
const testpic = require('file!../public/img/favicon.ico');
console.log('testpic',testpic)
console.log('bossSong',bossSong)

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

export const AppCtrl = [
  '$scope', '$rootScope',
  class AppCtrl {
    constructor($scope, $rootScope) {
      // $rootScope.currentSong = new Howl({
      //   src: ['music/Spellcasters_short_theme.ogg'],
      //   autoplay: true
      // })
      this.song = new Howl({
        src: [bossSong],
        autoplay: true
      })
      // console.log($rootScope.currentSong);
      $scope.playMusic = () => {
        // $rootScope.currentSong.play();
      }
      $scope.pauseMusic = () => {
        // $rootScope.currentSong.pause();
      }
    }
  }
]


const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router'])
  .config(($stateProvider,$urlRouterProvider) => {
    $stateProvider
      .state('active-game', WordsDatasetCtrlState)
      .state('splash',DefaultCtrlState)
      .state('instructions',InstructionsCtrlState)
      .state('game-over',GameOverCtrlState)
      .state('about',AboutCtrlState)
      .state('won',WonCtrlState)
      .state('login', LoginCtrlState)
      .state('registration', RegistrationCtrlState)

    $urlRouterProvider.otherwise('/');
  })
  .directive('app', app)
  .constant('numberToString', numberToString)
  .service('WordsService', WordsService)
  .service('TimerService', TimerService)
  .service('UserServices', UserServices)
  .service('UserStatsService', UserStatsService)
  .service('RegistrationServices', RegistrationServices)
  .service('LocalStorageService', LocalStorageService)
  .controller('AppCtrl', AppCtrl)
  .run(($rootScope) => {
    $rootScope.user = "Guest";

  })
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(WordsDatasetCtrlName, WordsDatasetCtrl)
  .controller(InstructionsCtrlName, InstructionsCtrl)
  .controller(GameOverCtrlName, GameOverCtrl)
  .controller(AboutCtrlName, AboutCtrl)
  .controller(WonCtrlName, WonCtrl)
  .controller(LoginCtrlName, LoginCtrl)
  .controller(RegistrationCtrlName, RegistrationCtrl);


export default MODULE_NAME;