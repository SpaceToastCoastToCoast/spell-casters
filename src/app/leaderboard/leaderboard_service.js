export const LeaderboardService = [

 '$http',

  class LeaderboardService {
    constructor ($http) {
      'ngInject';
      this.$http = $http;
      this.getLeaderboard = this.getLeaderboard.bind(this);
    }

    getLeaderboard() {
      const req = {
        method: 'GET',
        url: `/api/leaderboard`
      };
      return this.$http(req);
    }
  }
];