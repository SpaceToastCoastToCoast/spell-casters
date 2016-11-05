const template = require('./words_dataset.html');

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
'WordsService',
class WordsDatasetCtrl {
  constructor(WordsService) {
    this.words = [
      { word: 'acquire',
        prompt: 'AC___RE',
        hint: 'A fancy way of saying "to get" is to...'
      },
      { word: 'exceed',
        prompt: 'E___ED',
        hint: 'Go beyond what is allowed by, be better than, surpass' }
    ];
    this.newWords = [];
    WordsService.getWords().success(words => {
      this.newWords = words;
    });
    console.log('this.newWords', this.newWords);
  }
}];