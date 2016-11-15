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
'$rootScope',
'$state',
'$interval',
'$timeout',
class WordsDatasetCtrl {
  constructor(
    WordsService,
    TimerService,
    numberToString,
    $scope,
    $rootScope,
    $state,
    $interval,
    $timeout) {

    this.newWords = [];
    this.currentWord = 0;
    $scope.lvl = 1;
    this.misspelledWords = '';

    //set current song to short theme


    //debug
    //$scope.lvl = 3;
    //end debug

    TimerService.resetGame();

    $scope.timer = TimerService.timer;
    $scope.minutes = TimerService.minutes;
    $scope.seconds = TimerService.seconds;
    $scope.zero = TimerService.zero;

    TimerService.tick = function() {
      $scope.timer = TimerService.timer;
      $scope.minutes = TimerService.minutes;
      $scope.seconds = TimerService.seconds;
      $scope.zero = TimerService.zero;
      if ($scope.timer < 0) {
        TimerService.saveTime(30,$scope.lvl);
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

    //animation variables
    $scope.playerAnimState = "alephaIdle";
    $scope.enemyAnimState = "gatorIdle";
    $scope.bossAnimState = "noAnim";
    $scope.playerHealthShake = "noShake";
    $scope.shakeCanvas = "noShake";

    //is the enemy a gator or the boss?
    $scope.isGator = true;
    $scope.isBoss = false;
    $scope.showBossText = false;

    this.hearts = maxHearts;
    $scope.playerHealth = "fiveHearts";
    this.enemyHearts = maxHearts;
    $scope.enemyHealth = "fiveHearts";

    $scope.takeDamage = () => {
      this.hearts--;
      $scope.playerHealth = `${numberToString[this.hearts]}Hearts`;
      if (this.hearts <= 0) {
        TimerService.saveTime((30 - $scope.timer),$scope.lvl)
        WordsService.postStatistics($scope.lvl,this.currentWord,this.misspelledWords.substring(0,this.misspelledWords.length-2),TimerService.times);
        TimerService.killTimer();
        $scope.resetGame();
        $state.go('game-over')
      } else {
        $scope.playerHealthShake = "shake";
        $timeout(() => {
          $scope.playerHealthShake = "noShake";
        }, 500);
      }
    }

    $scope.giveDamage = (hits) => {
      $scope.showBeam = true;
      $scope.shakeCanvas = "shake";
      $timeout(() => {$scope.showBeam = false; $scope.shakeCanvas = "noShake"}, 500)
      if(!$scope.isBoss) {
        this.enemyHearts -= hits;
      } else {
        //if is boss
        console.log('hits on boss', hits)
        if(hits >= 4) {
          this.enemyHearts--;
          console.log(this.enemyHearts);
        }
      }
      $scope.enemyHealth = `${numberToString[this.enemyHearts]}Hearts`;
      if(this.enemyHearts <= 0) {
        $scope.enemyHealth = "noHearts";
        killEnemy();
      }
    }

    WordsService.initSpells().then(_ => {
      WordsService.initSpellsByLvl();
      WordsService.initRandomWords();
      this.newWords = WordsService.getWords($scope.lvl);
    })

    //disable pasting into textbox
    $scope.preventPaste = (e) => {
      e.preventDefault();
      return false;
    }

    //start timer on load
    TimerService.startTimer();

    const increaseLvl = () => {
      $scope.lvl++;
      TimerService.saveTime((30 - $scope.timer),$scope.lvl)
      TimerService.resetTimer();
      if ($scope.lvl <= 4) {
        this.newWords = WordsService.getWords($scope.lvl);
      }
      this.currentWord = 0;
      this.hearts = maxHearts;
      $scope.playerHealth = 'fiveHearts';
      if ($scope.lvl === 4) {
        $scope.isGator = false;
        $scope.isBoss = true;
        $scope.bossAnimState = "zettIdle"
        this.enemyHearts = maxHearts;
        this.enemyHealth = 'fiveHearts';
        $scope.showBossText = true;
      }
      if ($scope.lvl === 5) {
        TimerService.killTimer();
        WordsService.postStatistics(5,0,this.misspelledWords.substring(0,this.misspelledWords.length-2),TimerService.times)
        $state.go('won');
        $scope.showLevel = false;
      }
    }

    const killEnemy = () => {
      $scope.spellsCast = 0;
      $scope.chargeLevel= `${numberToString[$scope.spellsCast]}Charge`;

      TimerService.saveTime((30-$scope.timer),$scope.lvl);
      TimerService.resetTimer();

      if(!$scope.isBoss) {
        //load a new enemy if this is not the boss
        $scope.enemyAnimState = "gatorDie";
        $timeout(() => {
          this.enemyHearts = maxHearts;
          $scope.enemyHealth = "fiveHearts";
          $scope.enemyAnimState = "gatorIdle";
        }, 500);
      } else {
        //killed boss
        //$scope.bossAnimState = "bossDie";
        console.log('killed boss');
        $timeout(() => {
          increaseLvl();
        }, 1000);
      }
    }

    $scope.test = "";
    $scope.feedback = 'good';
    $scope.showLevel = false;
    $scope.resetGame = () => {
      this.hearts = maxHearts;
      $scope.lvl = 1;
      this.newWords = []
      this.currentWord = 0;
      $scope.test = "";
      $scope.feedback = 'good';
      $scope.showLevel = false;
      this.misspelledWords = '';
    }



    $scope.compare = () => {
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

      if (this.newWords[this.currentWord].word.toLowerCase().includes($scope.test.toLowerCase()) ) {
        $scope.feedback = 'good'
      } else if($scope.feedback === 'good') {
        if (this.misspelledWords.indexOf(this.newWords[this.currentWord].word.toLowerCase()) === -1) {
          this.misspelledWords += `${this.newWords[this.currentWord].word.toLowerCase()}, `
        }
        //subtract hearts from healthbar
        $scope.takeDamage();
        $scope.feedback = 'wrong'
      }
    };
  }
}];