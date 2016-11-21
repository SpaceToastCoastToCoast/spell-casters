export const HttpServices = [

'$http', '$rootScope',

  class HttpServices {
    constructor ($http, $rootScope) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.userDataQueryzz = this.userDataQueryzz.bind(this);
    }

    userDataQueryzz(){
      const req ={
        method: 'GET',
        url: `/api/game-stats/${this.$rootScope.user}`,
      };
      return this.$http(req);
    }
  }
];