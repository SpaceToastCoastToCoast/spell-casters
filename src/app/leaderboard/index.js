const template = require('./leaderboard.html');
const mainSong = require('../../public/music/Main.ogg');

export const LeaderboardCtrlName = 'LeaderboardCtrl';

export const LeaderboardCtrlState = {
  url: '/leaderboard',
  template,
  controller: LeaderboardCtrlName,
  controllerAs: 'leaderboard'
};


export const LeaderboardCtrl = [
  '$scope','$state', '$rootScope', 'LeaderboardService',

  class LeaderboardCtrl {
    constructor($scope,$state,$rootScope, LeaderboardService) {
      if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
      }

      $scope.goToSplash = () => {
        $state.go('splash')
      }
      this.places = ['first','second','third','fourth','fifth']
      this.places.forEach(place => {
        $scope[place + 'Username']
        $scope[place + 'Score'];
      })

      LeaderboardService.getLeaderboard().then(response => {
        response.data.highScores.forEach((data,index) => {
          $scope[this.places[index] + 'Username'] = data.username
          $scope[this.places[index] + 'Score'] = data.score
        })
      })

    }
  }
]