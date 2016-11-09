const template = require('./words_dataset.html');
const spellWords = require('../../public/spells.js');

const maxHearts = 5;
const minuteLimit = 2;
const times = {
  lvl1: 0,
  lvl2: 0,
  lvl3: 0,
  lvl4: 0
}

export const WordsDatasetCtrlName = 'WordsDatasetCtrl';

export const WordsDatasetCtrlState = {
  url: '/active-game',
  template,
  controller: WordsDatasetCtrlName,
  controllerAs: 'wordsDataset'
};

export const WordsService = [
  '$http',
  class WordsService {
    constructor ($http) {
      this.wordsData = [];
    }
    getWords (lvl) {
      this.wordsData = spellWords[`lvl${lvl}Words`];
      return spellWords[`lvl${lvl}Words`];
    }
  }
];

export const WordsDatasetCtrl = [
'WordsService','$scope', '$state', '$interval',
class WordsDatasetCtrl {
  constructor(WordsService, $scope, $state, $interval) {
    this.newWords = [];
    this.currentWord = 0;
    this.lvl = 1;
    this.newWords = WordsService.getWords(this.lvl);
    this.hearts = maxHearts;

    //timer controls
    $scope.minutes = minuteLimit;
    $scope.seconds = '00';
    $scope.zero = '';
    $scope.timer = $scope.minutes*60;
    $scope.countDown;

    //disable pasting into textbox
    $scope.preventPaste = (e) => {
      e.preventDefault();
      return false;
    }

    const startTimer = () => {
      $scope.countDown = $interval(function () {
        $scope.minutes = parseInt($scope.timer / 60, 10);
        $scope.seconds = parseInt($scope.timer % 60, 10);
        if ( $scope.seconds < 10 ) {
          $scope.zero = '0';
        } else {
          $scope.zero = ''
        }
        if (--$scope.timer < 0) {
          resetTimer();
          killTimer();
          $state.go('game-over')
        }
      }, 1000);
    }
    const killTimer = () => {
      $interval.cancel($scope.countDown);
    }

    const resetTimer = () => {
      $scope.minutes = minuteLimit;
      $scope.seconds = '00';
      $scope.zero = '';
      $scope.timer = $scope.minutes*60;
    }

    //start timer on load
    startTimer()

    const increaseLvl = () => {
      this.newWords = WordsService.getWords(++this.lvl);
      this.currentWord = 0;
      if (this.lvl === 5) {
        killTimer();
        saveTime($scope.timer)
        resetTimer();
        $state.go('won');
        $scope.showLevel = false;
      }
      saveTime($scope.timer)
      resetTimer();
    }

    const saveTime = (time) => {
      times['lvl'+(this.lvl-1)] = time;
    }

    $scope.test = "";
    $scope.feedback = 'good';
    $scope.showLevel = false;
    $scope.lostGame = false;
    $scope.lives = true;
    $scope.resetGame = () => {
      this.hearts = maxHearts;
      this.lvl = 1;
      this.newWords = WordsService.getWords(this.lvl);
      this.currentWord = 0;
      $scope.test = "";
      $scope.feedback = 'good';
      $scope.showLevel = false;
      $scope.completedGame = false;
      $scope.lives = true;
    }

    $scope.compare = () => {
      if (this.newWords[this.currentWord].word.toLowerCase().includes($scope.test.toLowerCase()) ) {
        $scope.feedback = 'good'
      } else if($scope.feedback === 'good') {
        this.hearts--;
        if (this.hearts <= 0) {
          $scope.lostGame = true;
          $scope.showLevel = false;
          $scope.lives = false;
          $state.go('game-over')
        }
        $scope.feedback = 'wrong'
      } else {
        if (this.hearts <= 0) {
          $scope.showLevel = false;
          $scope.lives = false;
          $scope.resetGame();
          $state.go('game-over')
        }
        $scope.feedback = 'wrong'
      }
      if(this.newWords[this.currentWord].word.toLowerCase() === $scope.test.toLowerCase()) {
        $scope.test = ""
        this.currentWord++;
        if (this.currentWord === this.newWords.length) {
          $scope.showLevel = true;
          increaseLvl();
        }
      }
    };
  }
}];