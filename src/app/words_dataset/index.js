const template = require('./words_dataset.html');
//const { lvl1Words, lvl2Words, lvl3Words, lvl4Words } = require('../../../data/spells');


export const WordsDatasetCtrlName = 'WordsDatasetCtrl';

export const WordsDatasetCtrlState = {
  url: '/',
  template,
  controller: WordsDatasetCtrlName,
  controllerAs: 'wordsDataset'
};

export const WordsService = [

  '$http',
  class WordsService {
    constructor ($http) {
      this.$http = $http;
    }
    getWords () {
      return this.$http.get('test.json');  //'/api/...'
    }
  }
];


export const WordsDatasetCtrl = [
'WordsService','$scope',
class WordsDatasetCtrl {
  constructor(WordsService, $scope) {
    this.newWords = [];
    WordsService.getWords().success(words => {
      //console.log('words: ', words);
      this.newWords = words;
    });

    $scope.test = "test";
  }
}];