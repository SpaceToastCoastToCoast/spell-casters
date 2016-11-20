import { StatisticServices } from './statistic_service';

export const HttpServices = [

'$http', '$rootScope', 'StatisticServices',

  class HttpServices {
    constructor ($http, $rootScope, StatisticServices) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.userDataQueryzz = this.userDataQueryzz.bind(this);
      this.StatisticServices = StatisticServices;
    }

    userDataQueryzz(){
      const req ={
        method: 'GET',
        url: `/api/game-stats/${this.$rootScope.user}`,
      };
      return this.$http(req).success(response => {
        console.log('response.stats: ', response.stats);
        console.log('response.recentGames: ', response.recentGames);
        this.StatisticServices.gameSummary(response.stats);
      });
    }
  }
];