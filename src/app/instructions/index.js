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
    TimerService.resetGame();

    this.testWords = [
      {
      "word": "a lot",
      "prompt": "A__OT",
      "hint": "When you have many of something, you have..."
    },
    {
      "word": "accommodate",
      "prompt": "AC______ATE",
      "hint": "When you go out of your way to make someone comfortable."
    }
    ];
    this.currentWord = 0;

    $scope.start = true;
    $scope.example = false;
    $scope.finished = false;
    $scope.finishedMessage = false;
    $scope.focusOnInput = false;
    $scope.input = "";
    $scope.feedback = 'good';

    if (SoundService.currentSong._src !== mainSong) {
      SoundService.setCurrentSong(mainSong);
    }
    //disable pasting into textbox
    $scope.preventPaste = (e) => {
      e.preventDefault();
      return false;
    }

    $scope.startTutorial = () => {
      $scope.example = true;
      $scope.start = false;
      $scope.focusOnInput = true;
    }

    $scope.compare = () => {
      if(this.testWords[this.currentWord].word.toLowerCase().includes($scope.input.toLowerCase())) {
        $scope.feedback = 'good'
      } else {
        $scope.feedback = 'wrong'
      }
      if (this.testWords[this.currentWord].word.toLowerCase() === $scope.input.toLowerCase()) {
        $scope.input = "";
        this.currentWord++;
        if (this.currentWord === this.testWords.length) {
          $scope.finished();
        }
      }
    }

    $scope.back = () => {
      $state.go('splash')
    }

    $scope.finished = () => {
      $scope.example = false;
      $scope.finishedMessage = true;
    }
  }
}]