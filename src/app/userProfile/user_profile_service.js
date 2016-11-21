import { GraphStatsServices } from './graph_stats_service';

export const UserProfileServices = [

'$http', '$rootScope', 'GraphStatsServices',

class UserProfileServices {
  constructor ($http, $rootScope, GraphStatsServices) {
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.userDataQuery = this.userDataQuery.bind(this);

    this.recentPercentComplete = [];
    this.GraphStatsServices = GraphStatsServices;
  }

  userDataQuery() {
    const req ={
      method: 'GET',
      url: `/api/game-stats/${this.$rootScope.user}`,
    };
    return this.$http(req).success(response => {

        //Data for latest games played
        let percentArrLatestGames = [];

        let recentGamesSimplified = response.recentGames[0];


        for(let x = 0; x<response.stats.length; x++){
          this.recentPercentComplete.push(recentGamesSimplified[x].percentCompleted);
        }

        // this.GraphStatsServices.setCurrentData(response.recentGames[0], response.stats);

    });
  }
}];
