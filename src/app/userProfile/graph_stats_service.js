export const GraphStatsServices = [

'$http', '$rootScope',

class GraphStatsServices {
  constructor($http, $rootScope){
    this.$http = $http;
    this.$rootScope = $rootScope;



  }

graphData(foo){

  console.log('foo: ', foo);
}
}];


