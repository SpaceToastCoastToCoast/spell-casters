const template = require('./words_dataset.html');
const spellWords = require('../../public/spells.js');

const maxHearts = 5;

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
    getWords (lvl) {
      this.wordsData = spellWords[`lvl${lvl}Words`];
      return spellWords[`lvl${lvl}Words`];
    }
  }
];

export const WordsDatasetCtrl = [
'WordsService','$scope',
class WordsDatasetCtrl {
  constructor(WordsService, $scope) {
    this.newWords = [];
    this.currentWord = 0;
    this.lvl = 1;
    this.newWords = WordsService.getWords(this.lvl);
    this.hearts = maxHearts;

    this.increaseLvl = () => {
      this.newWords = WordsService.getWords(++this.lvl);
      this.currentWord = 0;
      if (this.lvl === 5) {
        $scope.completedGame = true;
        $scope.showLevel = false;
      }
    }

    $scope.test = "";
    $scope.feedback = 'good'
    $scope.showLevel = false;
    $scope.completedGame = false;
    $scope.lostGame = false;
    $scope.lives = true;

    $scope.compare = () => {
      if (this.newWords[this.currentWord].word.toLowerCase().includes($scope.test.toLowerCase()) ) {
        $scope.feedback = 'good'
      } else {
        this.hearts--;
        if (this.hearts <= 0) {
          $scope.lostGame = true;
          $scope.showLevel = false;
          $scope.lives = false;
        }
        $scope.feedback = 'wrong'
      }
      if(this.newWords[this.currentWord].word.toLowerCase() === $scope.test.toLowerCase()) {
        $scope.test = ""
        this.currentWord++;
        if (this.currentWord === this.newWords.length) {
          $scope.showLevel = true;
          this.increaseLvl();
        }
      }
    };
  }
}];