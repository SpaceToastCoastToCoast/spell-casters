const template = require('./words_dataset.html');
const shortTheme = require('../../public/music/short_theme.ogg')
const bossTheme = require('../../public/music/boss_theme.ogg')
const alephaSpell = require('../../public/assets/alepha-spell.ogg')
const correctSpell = require('../../public/assets/correct.ogg')
const incorrectSpell = require('../../public/assets/spell-impact.ogg')
const zettSpell = require('../../public/assets/zett-spell.ogg')
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
'SoundService',
class WordsDatasetCtrl {
  constructor(
    WordsService,
    TimerService,
    numberToString,
    $scope,
    $rootScope,
    $state,
    $interval,
    $timeout,
    SoundService) {
    'ngInject';

    //Init variables
    this.newWords = [];
    this.currentWord = 0;
    $scope.lvl = 1;
    this.misspelledWords = [];
    $rootScope.canNavToGameOver = false;

    //set current song to short theme
    SoundService.setCurrentSong(shortTheme);

    //debug
    // $scope.lvl = 3;
    //end debug

    //Timer incorporation and init
    TimerService.resetGame();

    $scope.timer = TimerService.timer;
    $scope.isTimerStopped = TimerService.isTimerStopped;
    $scope.minutes = TimerService.minutes;
    $scope.seconds = TimerService.seconds;
    $scope.zero = TimerService.zero;

    TimerService.tick = function() {
      $scope.timer = TimerService.timer;
      $scope.minutes = TimerService.minutes;
      $scope.isTimerStopped = TimerService.isTimerStopped;
      $scope.seconds = TimerService.seconds;
      $scope.zero = TimerService.zero;
      if ($scope.timer < 0) {
        TimerService.saveTime(30, $scope.lvl);
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

    //Battle system variables
    $scope.spellsCast = 0;
    $scope.chargeLevel = "noCharge";
    $scope.showBeam = false;
    $scope.showSwipe = false;
    $scope.hidePlayerInput = false;
    $scope.focusOnInput = true;
    $scope.enemyIdleTimeout;

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
    $scope.bossMessage = "";

    //Health variables and functions
    this.hearts = maxHearts;
    $scope.playerHealth = "fiveHearts";
    this.enemyHearts = maxHearts;
    $scope.enemyHealth = "fiveHearts";

    $scope.takeDamage = () => {
      $scope.showSwipe = true;
      this.hearts--;
      $scope.playerHealth = `${numberToString[this.hearts]}Hearts`;
      if ($scope.isBoss) {
        SoundService.playSoundEffect(zettSpell);
      } else {
        SoundService.playSoundEffect(incorrectSpell)
      }
      if (this.hearts <= 0) {
        TimerService.saveTime((30 - $scope.timer),$scope.lvl)
        if ($rootScope.user !== 'Guest') {
          WordsService.postStatistics($scope.lvl,this.currentWord,this.misspelledWords,TimerService.times)
          .then(_ => {
            TimerService.killTimer();
            $scope.resetGame();
            $rootScope.canNavToGameOver = true;
            $state.go('game-over')
          })
        } else {
          const stats = WordsService.postStatistics($scope.lvl,this.currentWord,this.misspelledWords,TimerService.times)

          $rootScope.totalWordsCompleted = stats.totalWordsCompleted
          $rootScope.percentCompleted = stats.percentCompleted
          $rootScope.totalTimeElapsed = stats.totalTime
          $rootScope.score = stats.score

          let misspelledWordsString = this.misspelledWords.join(', ')
          misspelledWordsString.length - 2;
          $rootScope.misspelledWords = misspelledWordsString
          $rootScope.canNavToGameOver = true;
          $state.go('game-over');
        }
      } else {
        $scope.playerHealthShake = "shake";
        $timeout(() => {
          $scope.playerHealthShake = "noShake";
          $scope.showSwipe = false;
        }, 500);
      }
    }

    $scope.giveDamage = (hits) => {
      $scope.showBeam = true;
      $scope.shakeCanvas = "shake";
      SoundService.playSoundEffect(alephaSpell);
      $timeout(() => {
        $scope.showBeam = false;
        $scope.shakeCanvas = "noShake";
      }, 300);

      $scope.enemyIdleTimeout = $timeout(() => {
        $scope.enemyAnimState = "gatorIdle";
      }, 500);

      if(!$scope.isBoss) {
        this.enemyHearts -= hits;
        $scope.enemyAnimState = "gatorHit";
      } else {
        //if is boss
        if(hits >= 3) {
          this.enemyHearts--;
        }
      }
      $scope.enemyHealth = `${numberToString[this.enemyHearts]}Hearts`;
      if(this.enemyHearts <= 0) {
        $scope.enemyHealth = "noHearts";
        killEnemy();
      }
    }

    //disable pasting into textbox
    $scope.preventPaste = (e) => {
      e.preventDefault();
      return false;
    }

    WordsService.initSpells().then(_ => {
      WordsService.initSpellsByLvl();
      WordsService.initRandomWords();
      this.newWords = WordsService.getWords($scope.lvl);
    })


    //start timer on load
    TimerService.startTimer();

    //Display a short intro when the boss appears
    const showBoss = () => {
      TimerService.resetTimer();
      TimerService.killTimer();
      $scope.hidePlayerInput = true;
      $scope.isGator = false;
      $scope.isBoss = true;
      $scope.bossAnimState = "zettIdle";
      this.enemyHearts = maxHearts;
      this.enemyHealth = 'fiveHearts';
      $scope.bossMessage = "I should congratulate you, young sorceror, for having lasted this long against my Alphagators. But I shall personally see to it that your journey ends here.";
      $scope.showBossText = true;
      //set boss music
      if (SoundService.currentSong._src !== bossTheme) {
        SoundService.setCurrentSong(bossTheme);
      }

      $timeout(() => {
        $scope.bossMessage = "You are merely an amateur--I could subjugate you with only a fraction of my true power. Consider it an honor to see even this much!";
        $timeout(() => {
          $scope.hidePlayerInput = false;
          $scope.showBossText = false;
          TimerService.resumeTimer();
          $timeout(() => {
            $scope.focusOnInput = true;
          }, 50);
        }, 5000);
      }, 5000);
    }

    //Change background image for each level
    $scope.levelBackground = "level1";
    const levelLoader = (lvl) => {
      switch(lvl) {
        case 2:
        $scope.levelBackground = "level2";
        break;
        case 3:
        $scope.levelBackground = "level3";
        break;
        case 4:
        $scope.levelBackground = "level4";
        break;
        default:
        $scope.levelBackground = "level1";
        break;
      }
    }

    //Change game logic for each level
    const increaseLvl = () => {
      $scope.lvl++;

      if ($scope.lvl <= 4) {
        this.newWords = WordsService.getWords($scope.lvl);
        TimerService.saveTime((30 - $scope.timer),$scope.lvl)
        TimerService.resetTimer();
      }
      if ($scope.lvl === 4) {
        showBoss();
      }
      if ($scope.lvl === 5) {
        TimerService.killTimer();
        if ($rootScope.user !== 'Guest') {
          WordsService.postStatistics($scope.lvl,this.currentWord,this.misspelledWords,TimerService.times)
            .then(_ => {
              $rootScope.canNavToGameOver = true;
              $state.go('won');
            })
        } else {
          const stats = WordsService.postStatistics($scope.lvl,this.currentWord,this.misspelledWords,TimerService.times)

          $rootScope.totalWordsCompleted = stats.totalWordsCompleted
          $rootScope.percentCompleted = stats.percentCompleted
          $rootScope.totalTimeElapsed = stats.totalTime
          $rootScope.score = stats.score

          let misspelledWordsString = this.misspelledWords.join(', ')
          misspelledWordsString.length - 2;
          $rootScope.misspelledWords = misspelledWordsString
          $rootScope.canNavToGameOver = true;

          $state.go('won');
        }
        $scope.showLevel = false;
      }

      //reset currentWord index to starting point and reset hearts to max hearts
      this.currentWord = 0;
      this.hearts = maxHearts;
      $scope.playerHealth = 'fiveHearts';
    }

    const killBoss = () => {
      $scope.hidePlayerInput = true;
      TimerService.killTimer();
      $scope.bossAnimState = "bossDie";
      $scope.bossMessage = "I-Impossible! Me, defeated by a mere commoner? I refuse to accept this!";
      $scope.showBossText = true;

      $timeout(() => {
        $scope.bossMessage = "But, in this form, I cannot continue to challenge you. I must retreat for now--but this will not be the last you see of Lord Zett!";
        $timeout(() => {
          $scope.showBossText = false;
          increaseLvl();
        }, 5000);
      }, 5000);
    }

    const killEnemy = () => {
      $timeout.cancel($scope.enemyIdleTimeout);
      $scope.spellsCast = 0;
      $scope.chargeLevel= `${numberToString[$scope.spellsCast]}Charge`;

      TimerService.saveTime((30 - $scope.timer), $scope.lvl);
      TimerService.resetTimer();

      if(!$scope.isBoss) {
        //load a new enemy if this is not the boss
        TimerService.killTimer();
        $scope.enemyAnimState = "gatorDie";
        $timeout(() => {
          TimerService.resumeTimer();
          this.enemyHearts = maxHearts;
          $scope.enemyHealth = "fiveHearts";
          $scope.enemyAnimState = "gatorIdle";
        }, 960);
      } else {
        //killed boss
        killBoss();
      }
    }

    $scope.test = "";
    $scope.feedback = 'good';
    $scope.showLevel = false;

    //Reset game
    $scope.resetGame = () => {
      this.hearts = maxHearts;
      $scope.lvl = 1;
      this.newWords = []
      this.currentWord = 0;
      $scope.test = "";
      $scope.feedback = 'good';
      $scope.showLevel = false;
      this.misspelledWords = [];
    }


    //User interaction function
    $scope.compare = () => {
      //Should not perform any action if the timer is stopped
      if($scope.isTimerStopped) {
        return;
      }
      if(this.newWords[this.currentWord].word.toLowerCase() === $scope.test.toLowerCase()) {
        //successful spell, enemy takes damage
        $scope.spellsCast++;
        $scope.chargeLevel= `${numberToString[$scope.spellsCast]}Charge`;
        SoundService.playSoundEffect(correctSpell)
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
          $timeout(() => {
            $scope.showLevel = false;
          }, 5000);
          increaseLvl();
        }
      }

      if (this.newWords[this.currentWord].word.toLowerCase().includes($scope.test.toLowerCase()) ) {
        $scope.feedback = 'good'
      } else if($scope.feedback === 'good') {
        if (this.misspelledWords.indexOf(this.newWords[this.currentWord].word.toLowerCase()) === -1) {
          this.misspelledWords.push(this.newWords[this.currentWord].word.toLowerCase())
        }
        //subtract hearts from healthbar
        $scope.takeDamage();
        $scope.feedback = 'wrong'
      }
    };
  }
}];