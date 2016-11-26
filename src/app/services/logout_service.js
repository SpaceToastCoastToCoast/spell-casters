export const LogoutService = [

  '$rootScope',
  '$state',
  '$http',
  class LogoutService {
    constructor ($rootScope, $state, $http) {
      'ngInject';
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$http = $http;
    }

    userOut (userName, isVisibleBln, stateGo) {
      this.$http.get('/api/logout').success(() => {});
      this.$rootScope.user = userName;
      this.$rootScope.visible = isVisibleBln;
      this.$rootScope.$digest();
      this.$state.go(stateGo);
    }
  }
];