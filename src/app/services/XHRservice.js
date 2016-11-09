export XHRService = [

  '$http',
  class XHRService{
    constructor($http){
      this.$http = $http;

    }
    getLogin (){

      this.$http.get('')
    }
  }
]