const template = require('./timer.html');


export const TimerCtrlName = 'TimerCtrl';

export const TimerCtrlState = {
  url: '/timer',
  template,
  controller: TimerCtrlName,
  controllerAs: 'timer'
};

export const TimerCtrl = [
'$scope','$interval',
class TimerCtrl {
  constructor($scope, $interval) {
    $scope.minutes = 5;
    $scope.seconds = 0;
    $scope.zero = '';

    $scope.startTimer = function (duration) {
      $scope.timer = duration;
      $scope.countDown = $interval(function () {
        $scope.minutes = parseInt($scope.timer / 60, 10);
        $scope.seconds = parseInt($scope.timer % 60, 10);
        if ( $scope.seconds < 10 ) {
          $scope.zero = '0';
        } else {$scope.zero = ''}
        if (--$scope.timer < 0) {
            $scope.timer = duration;
        }
    }, 1000);
    };
    $scope.killTimer = function() {
      $interval.cancel($scope.countDown);
    };

  }
}];