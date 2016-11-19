export const GameChartsServices = [

'$http',

class GameChartsServices {
  constuctor($http){
    this.$http = $http;
    this.getUserStats = this.getUserStats.bind(this);

  }

//url: `/api/game-stats/${this.$rootScope.user}`
  // userDataQuery() {
  //   console.log('in GET')
  //   const req = {
  //     method: 'GET',
  //     url: `/api/game-stats/John`,
  //   };
  //   return this.$http(req)
  //     .success(response => {
  //       console.log('response.stats', response.stats);
  //       return;
  //   });

  // }

  getUserStats() {
    const req ={
      method: 'GET',
      url: `/api/leaderboard`
    };
    return this.$http(req)
  }

  }

];