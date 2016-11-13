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
       return this.$http(req).success(response => {
         console.log('response: ', response.stats);
        let allHighestPercent = response.stats.filter((percent) =>{
          console.log('percent: ', percent.percentComplete);

          return percent.percentComplete;
        });

       });
    }


 }
]