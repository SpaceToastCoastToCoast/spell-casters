export const GameOverService = [

 '$http', '$rootScope',

  class GameOverService {
    constructor ($http, $rootScope) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.totalWordsCompleted = null;
      this.percentCompleted = null;
      this.totalTimeElapsed = null;
    }

    //this is not working possibly due to api not updating before this
    //http request is made
    setLatestStats () {
      const req ={
        method: 'GET',
        url: `/api/game-stats/${this.$rootScope.user}`
      };

      return this.$http(req).success(response => {
        this.totalWordsCompleted = response.stats[0].totalWordsCompleted
        this.percentCompleted = response.stats[0].percentComplete
        this.totalTimeElapsed = response.stats[0].totalTimeElapsed
        console.log('words',this.totalWordsCompleted)
        console.log('percent',this.percentCompleted)
        console.log('time',this.totalTimeElapsed)
      })
    }

    getLatestStats() {
      return {
        totalWordsCompleted: this.totalWordsCompleted,
        percentCompleted: this.percentCompleted,
        totalTimeElapsed: this.totalWordsCompleted
      }
    }
  }
];