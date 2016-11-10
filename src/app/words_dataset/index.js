const template = require('./words_dataset.html');

const maxHearts = 5;

export const WordsDatasetCtrlName = 'WordsDatasetCtrl';

export const WordsDatasetCtrlState = {
  url: '/active-game',
  template,
  controller: WordsDatasetCtrlName,
  controllerAs: 'wordsDataset'
};

//Separate into services!!!

export const WordsDatasetCtrl = [
'WordsService',
'TimerService',
'numberToString',
'$scope',
'$state',
'$interval',
'$timeout',
class WordsDatasetCtrl {
  constructor(
    WordsService,
    TimerService,
    numberToString,
    $scope,
    $state,
    $interval,
    $timeout) {

    this.newWords = [];
    this.currentWord = 0;
    this.lvl = 1;

    $scope.timer = TimerService.timer;
    $scope.minutes = TimerService.minutes;
    $scope.seconds = TimerService.seconds;
    $scope.zero = TimerService.zero;

    TimerService.tick = function() {
      $scope.timer = TimerService.timer;
      $scope.minutes = TimerService.minutes;
      $scope.seconds = TimerService.seconds;
      $scope.zero = TimerService.zero;
      if ($scope.timer <= 0) {
        if($scope.spellsCast === 0) {
          $scope.takeDamage();
        } else {
          $scope.giveDamage($scope.spellsCast);
          $scope.spellsCast = 0;
          $scope.chargeLevel= `${numberToString[$scope.spellsCast]}Charge`;
        }
        TimerService.resetTimer();
      }
      $scope.$digest();
    }

    $scope.spellsCast = 0;
    $scope.chargeLevel = "noCharge";
    $scope.showBeam = false;

    $scope.playerAnimState = "alephaIdle";
    $scope.enemyAnimState = "gatorIdle";

    //is the enemy a gator or the boss?
    $scope.isGator = true;

    this.hearts = maxHearts;
    $scope.playerHealth = "fiveHearts";
    this.enemyHearts = maxHearts;
    $scope.enemyHealth = "fiveHearts";

    $scope.takeDamage = () => {
      this.hearts--;
      $scope.playerHealth = `${numberToString[this.hearts]}Hearts`;
    }

    $scope.giveDamage = (hits) => {
      $scope.showBeam = true;
      $timeout(() => {$scope.showBeam = false;}, 500)
      this.enemyHearts -= hits;
      $scope.enemyHealth = `${numberToString[this.enemyHearts]}Hearts`;
      if(this.enemyHearts <= 0) {
        $scope.enemyHealth = "noHearts";
        killEnemy();
      }
    }

    WordsService.initSpells().then(_ => {
      WordsService.initSpellsByLvl();
      WordsService.initRandomWords();
      this.newWords = WordsService.getWords(this.lvl);
    })

    //disable pasting into textbox
    $scope.preventPaste = (e) => {
      e.preventDefault();
      return false;
    }

    //start timer on load
    TimerService.startTimer();

    const increaseLvl = () => {
      TimerService.saveTime($scope.timer,this.lvl)
      TimerService.resetTimer();
      this.newWords = WordsService.getWords(++this.lvl);
      this.currentWord = 0;
      this.hearts = maxHearts;
      $scope.playerHealth = 'fiveHearts';
      if (this.lvl === 5) {
        TimerService.killTimer();
        WordsService.postStatistics(20,(maxHearts - this.hearts),times)
        $state.go('won');
        $scope.showLevel = false;
      }
    }

    const killEnemy = () => {
      this.spellsCast = 0;
      $scope.chargeLevel= `${numberToString[$scope.spellsCast]}Charge`;
      $scope.enemyAnimState = "gatorDie";
      TimerService.resetTimer();
      //load a new enemy
      $timeout(() => {
        this.enemyHearts = maxHearts;
        $scope.enemyHealth = "fiveHearts";
        $scope.enemyAnimState = "gatorIdle";
      }, 500);
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
          TimerService.saveTime($scope.timer,this.lvl)
          WordsService.postStatistics(((this.lvl-1)*5 + this.currentWord),(maxHearts - this.hearts),times);
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
        $scope.spellsCast++;
        $scope.chargeLevel= `${numberToString[$scope.spellsCast]}Charge`;
        if($scope.spellsCast >= 5) {
          TimerService.resetTimer();
          $scope.giveDamage($scope.spellsCast);
          $scope.spellsCast = 0;
          $scope.chargeLevel= `${numberToString[$scope.spellsCast]}Charge`;
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