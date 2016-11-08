

export const WordsService = [

  '$http',
  class WordsService {
    constructor ($http) {
      this.$http = $http;
    }
    getWords () {

      return this.$http.get('../../../data/test.json');  //'/api/...'
    }
  }
];