import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { WordsDatasetCtrlState, WordsDatasetCtrl, WordsDatasetCtrlName } from './words_dataset';
import { WordsService } from './words_dataset/words_service';
import { TimerService } from './words_dataset/timer_service';
import { focusMe } from './words_dataset/autoFocus';
import { numberToString } from './constants/numberToString';
import { UserStatsService } from './gameOver/user_stats_service';
import { RegistrationServices } from './registration/registration_service';
import { InstructionsCtrlState, InstructionsCtrl, InstructionsCtrlName } from './instructions';
import { DefaultCtrlState, DefaultCtrlName, DefaultCtrl } from './default';
import { GameOverCtrlState, GameOverCtrlName, GameOverCtrl } from './gameOver';
import { AboutCtrlState, AboutCtrlName, AboutCtrl } from './about';
import { WonCtrlState, WonCtrlName, WonCtrl } from './won';
import { UserServices, LoginCtrlState, LoginCtrlName, LoginCtrl } from './login';
import { RegistrationCtrlState, RegistrationCtrlName, RegistrationCtrl } from './registration';
import { LocalStorageService } from './services/localStorage_service';
import { SoundService } from './services/sound_service';
import { UserProfileCtrlState, UserProfileCtrlName, UserProfileCtrl } from './userProfile';
import { HttpServices } from './userProfile/http_service';
import { StatisticServices } from './userProfile/statistic_service';
import { HighPercentGraphServices } from './userProfile/highestPercentGraph_service';
import { UserProfileServices } from './userProfile/user_profile_service';
import { GraphStatsServices } from './userProfile/graph_stats_service';
import { LeaderboardCtrlState, LeaderboardCtrlName, LeaderboardCtrl } from './leaderboard';
import { LeaderboardService } from './leaderboard/leaderboard_service';
import { modal } from './directives/modal_directive';
import { ModalService } from './services/modal_service';
import { LogoutService } from './services/logout_service';
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
  '$scope',
  '$rootScope',
  '$state',
  'SoundService',

  class AppCtrl {
    constructor(
      $scope,
      $rootScope,
      $state,
      SoundService) {

      $scope.music = SoundService.musicOn
      $scope.sound = SoundService.soundEffectsOn;

      $scope.turnOnMusic = () => {
        SoundService.turnMusicOn()
        $scope.music = true;
      }
      $scope.turnOffMusic = () => {
        SoundService.turnMusicOff();
        $scope.music = false;
      }
      $scope.turnOnSoundEffects = () => {
        SoundService.soundEffectsOn = true;
        $scope.sound = true;
      }
      $scope.turnOffSoundEffects = () => {
        SoundService.soundEffectsOn = false;
        $scope.sound = false;
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
      .state('leaderboard', LeaderboardCtrlState);

    $urlRouterProvider.otherwise('/');
  })
  .directive('app', app)
  .directive('focusMe', focusMe)
  .directive('modal', modal)
  .constant('numberToString', numberToString)
  .service('WordsService', WordsService)
  .service('TimerService', TimerService)
  .service('UserServices', UserServices)
  .service('UserStatsService', UserStatsService)
  .service('HttpServices', HttpServices)
  .service('StatisticServices', StatisticServices)
  .service('HighPercentGraphServices', HighPercentGraphServices)
  .service('UserProfileServices', UserProfileServices)
  .service('GraphStatsServices', GraphStatsServices)
  .service('RegistrationServices', RegistrationServices)
  .service('LocalStorageService', LocalStorageService)
  .service('LeaderboardService', LeaderboardService)
  .service('SoundService', SoundService)
  .service('ModalService', ModalService)
  .service('LogoutService', LogoutService)
  .controller('AppCtrl', AppCtrl)
  .run(($rootScope, SoundService,$state) => {
    $rootScope.user = "Guest";
    $rootScope.canNavToGameOver = false;
    $rootScope.$on('$stateChangeStart', function(event,toState,toParams,fromState,fromParams) {
      if((toState.name === 'won' || toState.name === 'game-over')
        && !$rootScope.canNavToGameOver) {
        event.preventDefault();
        $state.go('splash')
      }
      if (toState.name === 'userProfile' && $rootScope.user === 'Guest') {
        event.preventDefault();
        $state.go('splash')
      }
      return;
    })
    SoundService.setCurrentSong(mainSong);
  })
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(WordsDatasetCtrlName, WordsDatasetCtrl)
  .controller(InstructionsCtrlName, InstructionsCtrl)
  .controller(GameOverCtrlName, GameOverCtrl)
  .controller(AboutCtrlName, AboutCtrl)
  .controller(WonCtrlName, WonCtrl)
  .controller(LoginCtrlName, LoginCtrl)
  .controller(RegistrationCtrlName, RegistrationCtrl)
  .controller(UserProfileCtrlName, UserProfileCtrl)
  .controller(LeaderboardCtrlName, LeaderboardCtrl)


export default MODULE_NAME;