const template = require('./instructions.html');



export const InstructionsCtrlName = 'InstructionsCtrl';

export const InstructionsCtrlState = {
  url: '/instructions',
  template,
  controller: InstructionsCtrlName,
  controllerAs: 'instructions'
};

export const InstructionsCtrl = [
'$scope', '$state',
class InstructionsCtrl {
  constructor($scope,$state) {
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
    $scope.input = "";
    $scope.feedback = 'good';

    //disable pasting into textbox
    $scope.preventPaste = (e) => {
      e.preventDefault();
      return false;
    }

    $scope.startTutorial = () => {
      $scope.example = true;
      $scope.start = false;
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