export const StatisticServices = [

'$http', '$rootScope',

  class StatisticServices {
    constructor ($http, $rootScope) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.gameSummary = this.gameSummary.bind(this);
    }

    gameSummary(stats){
      console.log('gamesummary: ', stats);

    }
  }
];