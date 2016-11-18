const template = require('./splash.html');
const mainSong = require('../../public/music/Main.ogg');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default',
  params: {
    visible: false
  }
};

export const DefaultCtrl = [
  '$scope','$state','$stateParams','$rootScope','LocalStorageService',

  class DefaultCtrl {
    constructor($scope,$state,$stateParams,$rootScope,LocalStorageService) {
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
      $scope.goToLeaderboard = () => {
        $state.go('leaderboard')
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

      $scope.goToUserProfile = () => {
        console.log('food: ');
        $state.go('userProfile')
      }
    }
  }
]