export const LogoutService = [

  'LocalStorageService',
  '$rootScope',
  '$state',
  '$http',
  class LogoutService {
    constructor (LocalStorageService, $rootScope, $state, $http) {
      this.LocalStorageService = LocalStorageService;
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$http = $http;
    }

    userOut (lstorageObj, userName, isVisibleBln, stateGo) {
      this.LocalStorageService.resetData(lstorageObj);
      this.$http.get('/api/logout').success(() => {});
      this.$rootScope.user = userName;
      this.$rootScope.visible = isVisibleBln;
      this.$rootScope.$digest();
      this.$state.go(stateGo);
    }
  }
];