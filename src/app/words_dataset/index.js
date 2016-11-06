const template = require('./words_dataset.html');
const spellWords = require('../../public/spells.js');

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
      this.wordsData = [];
    }
    getWords () {
      return this.$http.get('./spells.js');  //'/api/...'
    }
    getWords2 () {
      this.wordsData = spellWords.lvl1Words;
      return spellWords.lvl1Words;
    }

  }
];


export const WordsDatasetCtrl = [
'WordsService','$scope',
class WordsDatasetCtrl {
  constructor(WordsService, $scope) {
    this.newWords = [];
    this.newWords = WordsService.getWords2();

    $scope.test = "Spell the word!";
    $scope.feedback = 'good'
    $scope.compare = () => {
      if (this.newWords[1].word.includes($scope.test.toLowerCase()) ) {
        $scope.feedback = 'good'
      } else {
        $scope.feedback = 'wrong'
      }
    };
    // WordsService.getWords2().success((words) => {
    //   console.log('words: ', words);
    //   this.newWords = words;
    // });

  }
}];