export const UserProfileServices = [

 '$http', '$rootScope',

 class UserProfileServices {
  constructor ($http, $rootScope) {
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.userDataQuery = this.userDataQuery.bind(this);
    this.highestPercentComplete = null;
    this.averagePercentComplete = null;
    this.totalWordsCompleted = null;
    this.averageWordsCompleted = null;
    this.totalMistakesMade = null;
    this.averageMistakes = null;
    this.totalTimePlayed = null;
    this.averageGameTime = null;
  }

  userDataQuery() {
    const req ={
      method: 'GET',
      url: `/api/game-stats/${this.$rootScope.user}`,
      };
      console.log('req: ', req);
       return this.$http(req).success(response => {

        //MaxPercentCompleted
        let percentArr = [];

        for(let x = 0; x<response.stats.length; x++){
          percentArr.push(response.stats[x].percentCompleted);
        }

        //AveragePercentCompleted
        let totalGamesPlayed = percentArr.length;

        this.highestPercentComplete = Math.max(...percentArr);
        console.log('this.highestPercentComplete: ', this.highestPercentComplete);

        let percentSum = percentArr.reduce((a, b) => a + b, 0);
        console.log('percentSum: ', percentSum);

        this.averagePercentComplete =  ((percentSum / totalGamesPlayed) *100);
        console.log('this.averagePercentComplete: ', this.averagePercentComplete);
       });
    }


 }
]