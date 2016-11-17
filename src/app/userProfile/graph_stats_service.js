export const GraphStatsServices = [

'$http', '$rootScope', 'UserProfileServices',

class GraphStatsServices {
  constuctor($http, $rootScope, UserProfileServices){
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.UserProfileServices = UserProfileServices;
  }

graphData(){
  console.log('UserProfileServices.: ', UserProfileServices.highestPercentComplete);
}

}];


