import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { WordsDatasetCtrlState, WordsDatasetCtrl, WordsDatasetCtrlName } from './words_dataset';
import { WordsService } from './words_dataset/words_service';
import { TimerService } from './words_dataset/timer_service';
import { numberToString } from './constants/numberToString';
import { UserStatsService } from './gameOver/game_over_service';
import { RegistrationServices } from './registration/registration_service';
import { InstructionsCtrlState, InstructionsCtrl, InstructionsCtrlName } from './instructions';
import { DefaultCtrlState, DefaultCtrlName, DefaultCtrl } from './default';
import { GameOverCtrlState, GameOverCtrlName, GameOverCtrl } from './gameOver';
import { AboutCtrlState, AboutCtrlName, AboutCtrl } from './about';
import { WonCtrlState, WonCtrlName, WonCtrl } from './won';
import { UserServices, LoginCtrlState, LoginCtrlName, LoginCtrl } from './login';
import { RegistrationCtrlState, RegistrationCtrlName, RegistrationCtrl } from './registration';
import { LocalStorageService } from './services/localStorage_service';
import { UserProfileCtrlState, UserProfileCtrlName, UserProfileCtrl } from './userProfile';
import { UserProfileServices } from './userProfile/user_profile_service';
import '../style/app.css';
const mainSong = require('../public/music/Main.ogg');

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

      $scope.playMusic = () => {
        $rootScope.currentSong.play();
      }
      $scope.pauseMusic = () => {
        $rootScope.currentSong.pause();
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
      .state('userProfile', UserProfileCtrlState)

    $urlRouterProvider.otherwise('/');
  })
  .directive('app', app)
  .constant('numberToString', numberToString)
  .service('WordsService', WordsService)
  .service('TimerService', TimerService)
  .service('UserServices', UserServices)
  .service('UserStatsService', UserStatsService)
  .service('UserProfileServices', UserProfileServices)
  .service('RegistrationServices', RegistrationServices)
  .service('LocalStorageService', LocalStorageService)
  .controller('AppCtrl', AppCtrl)
  .run(($rootScope) => {
    $rootScope.user = "Guest";
    $rootScope.playSoundEffect = (soundPath) => {
      if($rootScope.currentSound) {
        $rootScope.currentSound.pause();
      }
      $rootScope.currentSound = new Howl({
        src: [soundPath],
        autoplay: true
      })
    }
    $rootScope.setCurrentSong = (songPath) => {
      if ($rootScope.currentSong) {
        $rootScope.currentSong.pause();
      }
      $rootScope.currentSong = new Howl({
        src: [songPath],
        autoplay: true,
        loop: true
      })
    }
    $rootScope.setCurrentSong(mainSong);
  })
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(WordsDatasetCtrlName, WordsDatasetCtrl)
  .controller(InstructionsCtrlName, InstructionsCtrl)
  .controller(GameOverCtrlName, GameOverCtrl)
  .controller(AboutCtrlName, AboutCtrl)
  .controller(WonCtrlName, WonCtrl)
  .controller(LoginCtrlName, LoginCtrl)
  .controller(RegistrationCtrlName, RegistrationCtrl)
  .controller(UserProfileCtrlName, UserProfileCtrl);


export default MODULE_NAME;