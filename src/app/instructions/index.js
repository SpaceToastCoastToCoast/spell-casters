const template = require('./instructions.html');
const mainSong = require('../../public/music/Main.ogg');

export const InstructionsCtrlName = 'InstructionsCtrl';

export const InstructionsCtrlState = {
  url: '/instructions',
  template,
  controller: InstructionsCtrlName,
  controllerAs: 'instructions'
};

export const InstructionsCtrl = [
'$scope',
'$state',
'$rootScope',
'TimerService',
'SoundService',

class InstructionsCtrl {
  constructor(
    $scope,
    $state,
    $rootScope,
    TimerService,
    SoundService) {
    'ngInject';

    TimerService.resetGame();

    this.testWords = [
      {
        "word": "accommodate",
        "prompt": "AC______ATE",
        "hint": "When you go out of your way to make someone comfortable."
      }, {
        "word": "a lot",
        "prompt": "A__OT",
        "hint": "When you have many of something, you have..."
      }
    ];
    this.currentWord = 0;

    $scope.base = true;
    $scope.example = false;
    $scope.finished = false;
    $scope.finishedMessage = false;
    $scope.focusOnInput = false;
    $scope.showHint = false;
    $scope.tutorialText = true;
    $scope.showPlayerInput = false;
    $scope.input = "";
    $scope.feedback = 'good';
    $scope.correct = true;

    if (SoundService.currentSong._src !== mainSong) {
      SoundService.setCurrentSong(mainSong);
    }

    $scope.preventPaste = (e) => {
      e.preventDefault();
      return false;
    }

    $scope.startTutorial = () => {
      $scope.base = false;
      $scope.example = true;
      $scope.focusOnInput = true;
    }

    $scope.nextButton = () => {
      $scope.showHint = true;
      $scope.tutorialText = false;
      $scope.showTargetWord = true;
    }

    $scope.compare = () => {
      if(this.testWords[this.currentWord].word.toLowerCase().includes($scope.input.toLowerCase())) {
        $scope.feedback = 'good';
        $scope.correct = true
      } else {
        $scope.feedback = 'wrong'
        $scope.correct = false;
      }
      if (this.testWords[this.currentWord].word.toLowerCase() === $scope.input.toLowerCase()) {
        $scope.input = "";
        this.currentWord++;
        if (this.currentWord === this.testWords.length) {
          $scope.finished();
        }
      }
    }

    $scope.finished = () => {
      $scope.base = false;
      $scope.example = false;
      $scope.finishedMessage = true;
    }
  }
}]