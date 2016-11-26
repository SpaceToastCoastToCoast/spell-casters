export const UserStatsService = [

 '$http', '$rootScope',

  class UserStatsService {
    constructor ($http, $rootScope) {
      'ngInject';
      this.$http = $http;
      this.$rootScope = $rootScope;

    }

    //this is not working possibly due to api not updating before this
    //http request is made
    getLatestStats () {
      const req = {
        method: 'GET',
        url: `/api/game-stats/${this.$rootScope.user}`
      };

      return this.$http(req);
    }
  }
];