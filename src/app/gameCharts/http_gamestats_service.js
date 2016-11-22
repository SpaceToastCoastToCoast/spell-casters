export const HttpGameStatsServices = [
'$http',

class HttpGameStatsServices {
  constructor($http){
    this.$http = $http;
    this.userDataQuery = this.userDataQuery.bind(this);
  }

//url: `/api/game-stats/${this.$rootScope.user}`
  userDataQuery() {
    const req = {
      method: 'GET',
      url: `/api/game-stats/John`,
    };
    return this.$http(req);
  }
}];
