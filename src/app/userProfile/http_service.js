export const HttpServices = [

'$http', '$rootScope',

  class HttpServices {
    constructor ($http, $rootScope) {
      'ngInject';
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.userDataQuery = this.userDataQuery.bind(this);
    }

    userDataQuery(){
      const req ={
        method: 'GET',
        url: `/api/game-stats/${this.$rootScope.user}`,
      };
      return this.$http(req);
    }

    userHighscoreQuery() {
      const req={
        method: 'GET',
        url: `/api/leaderboard`
      }
      return this.$http(req);
    }
  }
];