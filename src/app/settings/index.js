const template = require('./settings.html');
const mainSong = require('../../public/music/Main.ogg');

export const SettingsCtrlName = 'SettingsCtrl';

export const SettingsCtrlState = {
  url: '/settings',
  template,
  controller: SettingsCtrlName,
  controllerAs: 'settings'
};

export const SettingsCtrl = [
  '$scope',
  '$state',
  '$rootScope',
  'TimerService',
  'SoundService',

  class SettingsCtrl {
    constructor(
      $scope,
      $state,
      $rootScope,
      TimerService,
      SoundService) {
      //should be able to pause game to go to settings and shut off music
      TimerService.resetGame();

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

      $scope.goBack = () => {
        $state.go($rootScope.$previousState);
      }
    }
  }
]