// import { StatisticServcies } from './statistic_service';

export const HttpServices = [

'$http', '$rootScope',

  class HttpServices {
    constructor ($http, $rootScope) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.userDataQuery = this.userDataQuery.bind(this);
    }

    userDataQuery(){
      const req ={
        method: 'GET',
        url: `/api/game-stats/${this.$rootScope.user}`,
      };
      return this.$http(req).success(response => {
        console.log('response.stats: ', response.stats);
        console.log('reponse.recentGames: ', reponse.recentGames);
      });
    }
  }
];