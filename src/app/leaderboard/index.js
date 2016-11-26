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
  '$scope',
  '$state',
  '$rootScope',
  'LeaderboardService',
  'TimerService',
  'SoundService',

  class LeaderboardCtrl {
    constructor(
      $scope,
      $state,
      $rootScope,
      LeaderboardService,
      TimerService,
      SoundService) {
      'ngInject';
      TimerService.resetGame();

      if (SoundService.currentSong._src !== mainSong) {
        SoundService.setCurrentSong(mainSong);
      }

      this.places = ['first','second','third','fourth','fifth'];
      this.places.forEach(place => {
        $scope[place + 'Username']
        $scope[place + 'Score'];
      })

      LeaderboardService.getLeaderboard().then(response => {
        response.data.highscores.forEach((data,index) => {
          $scope[this.places[index] + 'Username'] = data.username;
          $scope[this.places[index] + 'Score'] = data.score;
        })
      })

    }
  }
]