const template = require('./words_dataset.html');

const maxHearts = 5;
const minuteLimit = 0.5;
const times = {
  lvl1: null,
  lvl2: null,
  lvl3: null,
  lvl4: null
}

const numberToString = [
  'no',
  'one',
  'two',
  'three',
  'four',
  'five'
]

export const WordsDatasetCtrlName = 'WordsDatasetCtrl';

export const WordsDatasetCtrlState = {
  url: '/active-game',
  template,
  controller: WordsDatasetCtrlName,
  controllerAs: 'wordsDataset'
};

//Separate into services!!!

export const WordsDatasetCtrl = [
'WordsService','$scope', '$state', '$interval', '$timeout',
class WordsDatasetCtrl {
  constructor(WordsService, $scope, $state, $interval, $timeout) {
    this.newWords = [];
    this.currentWord = 0;
    this.lvl = 1;

    this.spellsCast = 0;

    $scope.playerAnimState = "alephaIdle";
    $scope.enemyAnimState = "gatorIdle";

    this.hearts = maxHearts;
    $scope.playerHealth = "fiveHearts";
    this.enemyHearts = maxHearts;
    $scope.enemyHealth = "fiveHearts";

    $scope.takeDamage = () => {
      this.hearts--;
      $scope.playerHealth = `${numberToString[this.hearts]}Hearts`;
    }

    $scope.giveDamage = (hits) => {
      this.enemyHearts -= hits;
      $scope.enemyHealth = `${numberToString[this.enemyHearts]}Hearts`;
      if(this.enemyHearts <= 0) {
        $scope.enemyHealth = "noHearts";
        killEnemy();
      }
    }

    WordsService.initGame().then(_ => {
      WordsService.initSpellsByLvl();
      WordsService.initRandomWords();
      this.newWords = WordsService.getWords(this.lvl);
    })

    //timer controls
    $scope.minutes = 0;
    $scope.seconds = '30';
    $scope.zero = '';
    $scope.timer = minuteLimit * 60;
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
          if(this.spellsCast === 0) {
            $scope.takeDamage();
          } else {
            $scope.giveDamage(this.spellsCast);
          }
        }
      }, 1000);
    }

    const killTimer = () => {
      $interval.cancel($scope.countDown);
    }

    const resetTimer = () => {
      $scope.minutes = 0;
      $scope.seconds = minuteLimit * 60;
      $scope.zero = '';
      $scope.timer = $scope.seconds;
    }

    //start timer on load
    startTimer();

    const increaseLvl = () => {
      saveTime($scope.timer,this.lvl)
      resetTimer();
      this.newWords = WordsService.getWords(++this.lvl);
      this.currentWord = 0;
      if (this.lvl === 5) {
        killTimer();
        WordsService.postStatistics(1,20,(maxHearts - this.hearts),times)
        $state.go('won');
        $scope.showLevel = false;
      }
    }

    const killEnemy = () => {
      this.spellsCast = 0;
      $scope.enemyAnimState = "gatorDie";
      resetTimer();
      this.newWords = WordsService.getWords(this.lvl);
      this.currentWord = 0;
      //load a new enemy
      $timeout(() => {
        $scope.enemyHealth = "fiveHearts";
        $scope.enemyAnimState = "gatorIdle";
      }, 500);

      // //Debug
      // killTimer();
      // $state.go('won');
      // $scope.showLevel = false;
    }

    const saveTime = (time,lvl) => {
      times['lvl'+lvl] = time;
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
        //subtract hearts from healthbar
        $scope.takeDamage();
        if (this.hearts <= 0) {
          $scope.showLevel = false;
          $scope.lives = false;
          saveTime($scope.timer,this.lvl)
          WordsService.postStatistics(1,((this.lvl-1)*5 + this.currentWord),(maxHearts - this.hearts),times)
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
        //successful spell, enemy takes damage
        this.spellsCast++;
        if($scope.timer <= 1 || this.spellsCast >= 5) {
          $scope.giveDamage(this.spellsCast);
          this.spellsCast = 0;
        }
        $scope.test = "";
        this.currentWord++;
        if (this.currentWord === this.newWords.length) {
          $scope.showLevel = true;
          increaseLvl();
        }
      }
    };
  }
}];