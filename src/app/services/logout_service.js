export const LogoutService = [

  'LocalStorageService',
  '$rootScope',
  '$state',
  class LogoutService {
    constructor (LocalStorageService, $rootScope, $state) {
      this.LocalStorageService = LocalStorageService;
      this.$rootScope = $rootScope;
      this.$state = $state;
    }

    userOut (lstorageObj, userName, isVisibleBln, stateGo) {
      this.LocalStorageService.resetData(lstorageObj);
      this.$rootScope.user = userName;
      this.$rootScope.visible = isVisibleBln;
      this.$rootScope.$digest();
      this.$state.go(stateGo)
    }

  }
];