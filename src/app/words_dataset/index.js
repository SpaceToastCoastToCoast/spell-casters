const template = require('./words_dataset.html');
const spellWords = {
  lvl1Words: null,
  lvl2Words: null,
  lvl3Words: null,
  lvl4Words: null
}

const randomDatasetLength = 5;
const maxHearts = 10;
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
  '$http', '$q',
  class WordsService {
    constructor ($http, $q) {
      this.wordsData = [];
      this.bossSpells = {};
      this.baseSpells = {};
      this.easy = [];
      this.medium = [];
      this.hard = [];
      this.boss = [];
      this.$http = $http;
      this.$q = $q;
      this.initBossSpells = this.initBossSpells.bind(this)
      this.initBaseSpells = this.initBaseSpells.bind(this)
      this.syllableCount = this.syllableCount.bind(this)
      this.getRandomWords = this.getRandomWords.bind(this)
    }
    getWords (lvl) {
      this.wordsData = spellWords[`lvl${lvl}Words`];
      return spellWords[`lvl${lvl}Words`];
    }
    initBossSpells() {
      return this.$http.get('/api/boss_spells').success(response => {
        this.bossSpells = response.boss_spells;
        return response.boss_spells
      })
    }
    initBaseSpells() {
      return this.$http.get('/api/base_spells').success(response => {
        this.baseSpells = response.base_spells;
        return response.base_spells
      })
    }
    getBossSpells() {
      return this.bossSpells
    }
    getBaseSpells() {
      return this.baseSpells;
    }
    initGame() {
      const initSpells = [this.initBaseSpells(),this.initBossSpells()];
      return this.$q.all(initSpells).then(values => {
        this.baseSpells = values[0].data.base_spells
        this.bossSpells = values[1].data.boss_spells
      })
    }
    initSpellsByLvl () {
      for (var wordObj in this.baseSpells) {
        if (this.syllableCount(this.baseSpells[wordObj].word) > 3) {
          this.hard.push(this.baseSpells[wordObj])
        } else if (this.syllableCount(this.baseSpells[wordObj].word) > 2) {
          this.medium.push(this.baseSpells[wordObj])
        } else {
          this.easy.push(this.baseSpells[wordObj])
        }
      }

      for (var wordObj in this.bossSpells) {
        this.boss.push(this.bossSpells[wordObj])
      }
    }
    syllableCount(word) {
      word = word.toLowerCase();                                     //word.downcase!
      if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
      word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
      return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
    }
    getRandomWords(arr) {
      const max = arr.length - 1;
      const randomIndicies = [];
      const randomWords = [];

      while(randomWords.length < randomDatasetLength) {
        const randomIndex = Math.floor(Math.random() * (max))

        if (randomIndicies.indexOf(randomIndex) === -1) {
          randomIndicies.push(randomIndex);
          randomWords.push(arr[randomIndex]);
        }
      }
      return randomWords;
    }
    initRandomWords() {
      spellWords.lvl1Words = this.getRandomWords(this.easy)
      spellWords.lvl2Words = this.getRandomWords(this.medium)
      spellWords.lvl3Words = this.getRandomWords(this.hard)
      spellWords.lvl4Words = this.getRandomWords(this.boss)
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

    this.hearts = maxHearts;

    WordsService.initGame().then(_ => {
      WordsService.initSpellsByLvl();
      WordsService.initRandomWords();
      this.newWords = WordsService.getWords(this.lvl);
    })

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
    $scope.lives = true;
    $scope.resetGame = () => {
      this.hearts = maxHearts;
      this.lvl = 1;
      this.newWords = WordsService.getWords(this.lvl);
      this.currentWord = 0;
      $scope.test = "";
      $scope.feedback = 'good';
      $scope.showLevel = false;
      $scope.lives = true;
    }

    $scope.compare = () => {
      if (this.newWords[this.currentWord].word.toLowerCase().includes($scope.test.toLowerCase()) ) {
        $scope.feedback = 'good'
      } else if($scope.feedback === 'good') {
        this.hearts--;
        if (this.hearts <= 0) {
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