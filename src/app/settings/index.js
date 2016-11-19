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
  '$scope','$state','$rootScope', 'TimerService',

  class SettingsCtrl {
    constructor($scope,$state,$rootScope,TimerService) {
      //should be able to pause game to go to settings and shut off music
      TimerService.resetGame();

      // if ($rootScope.currentSong._src !== mainSong) {
      //   $rootScope.setCurrentSong(mainSong);
      // }
      if($rootScope.currentSong.playing) {
        $scope.music = true;
      } else {
        $scope.music = false;
      }

      $scope.sound = true;


      $scope.turnOnMusic = () => {
        $scope.music = true;
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
        $rootScope.currentSong.play();
      }

      $scope.turnOffMusic = () => {
        $rootScope.currentSong.pause();
        $rootScope.setCurrentSong = (songPath) => {
          //reset function to not play any music
        }
        $scope.music = false;
      }
      $scope.turnOnSoundEffects = () => {
        $rootScope.playSoundEffect = (soundPath) => {
          if($rootScope.currentSound) {
            $rootScope.currentSound.pause();
          }
          $rootScope.currentSound = new Howl({
            src: [soundPath],
            autoplay: true
          })
        }
        $scope.sound = true;
      }
      $scope.turnOffSoundEffects = () => {
        $rootScope.playSoundEffect = (soundPath) => {
          //reset function to not play any sound effects
        }
        $scope.sound = false;
      }
      $scope.goToSplash = () => {
        $state.go('splash')
      }
    }
  }
]