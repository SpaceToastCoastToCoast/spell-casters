export const GraphStatsServices = [

'$http', '$rootScope', 'UserProfileServices',

class GraphStatsServices {
  constructor($http, $rootScope, UserProfileServices){
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.UserProfileServices = UserProfileServices;
  }

graphData(){
  console.log('UserProfileServices.: ', this.UserProfileServices.highestPercentComplete);
}

}];


