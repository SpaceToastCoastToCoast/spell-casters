const template = require('./splash.html');
const mainSong = require('file!../../public/music/Main.ogg');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default',
  params: {
    visible: false,
    registrationMessage: null
  }
};

export const DefaultCtrl = [
  '$scope','$state','$stateParams','$rootScope','LocalStorageService',

  class DefaultCtrl {
    constructor($scope,$state,$stateParams,$rootScope,LocalStorageService) {
      // $scope.ezmiez = LocalStorageService.getData('user');
      // console.log('ezmiez', $scope.ezmiez);

      if($rootScope.currentSong === undefined) {
        $rootScope.setCurrentSong(mainSong);
      } else if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
      }

      $scope.goToInstructions = () => {
        $state.go('instructions');
      };
      $scope.goToActiveGame = () => {
        $state.go('active-game');
      };
      $scope.goToAbout = () => {
        $state.go('about');
      };
      $scope.goToLogIn = () => {
        $state.go('login')
      }

      $scope.LogOut = () => {
        LocalStorageService.resetData('user');
        $rootScope.user = 'Guest';
        $rootScope.visible = false;
        $state.go('splash')
      };
      $scope.registrationMessage = $stateParams.registrationMessage;

      $scope.goToUserProfile = () => {
        console.log('food: ');
        $state.go('userProfile')
      }
    }
  }
]