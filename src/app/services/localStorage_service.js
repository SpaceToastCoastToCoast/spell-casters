export const LocalStorageService = [

 '$window', '$rootScope',

  class LocalStorageService {
    constructor ($window, $rootScope) {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.item = null;
    }

    setData(key,value) {
      return this.$window.localStorage.setItem(key, JSON.stringify(value));
    }

    getData(key) {
      this.item = JSON.parse(this.$window.localStorage.getItem(key));
      return this.item;
    }

    resetData(key) {
      return this.$window.localStorage.setItem(key, JSON.stringify(''));
    }
  }
];