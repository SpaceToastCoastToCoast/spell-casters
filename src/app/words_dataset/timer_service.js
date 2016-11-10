const times = {
  lvl1: null,
  lvl2: null,
  lvl3: null,
  lvl4: null
}

const minuteLimit = 0.5;

export const TimerService = [
  'numberToString',
  '$interval',
  class TimerService {
    constructor(numberToString) {
      //timer controls
      this.minutes = 0;
      this.seconds = '30';
      this.zero = '';
      this.timer = minuteLimit * 60;
      this.countDown;

      // this.startTimer = this.startTimer.bind(this);
      // this.killTimer = this.killTimer.bind(this);
      // this.resetTimer = this.resetTimer.bind(this);
      // this.saveTime = this.saveTime.bind(this);
      this.numberToString = numberToString;

      this.tick = () => {}; // will be overwritten
    }

    startTimer() {
      this.countDown = setInterval(() => {
        this.minutes = parseInt(this.timer / 60, 10);
        this.seconds = parseInt(this.timer % 60, 10);
        if ( this.seconds < 10 ) {
          this.zero = '0';
        } else {
          this.zero = ''
        }
        this.timer--;
        this.tick();
      }, 1000);
    }

    killTimer() {
      clearInterval(this.countDown);
    }

    resetTimer() {
      this.minutes = 0;
      this.seconds = minuteLimit * 60;
      this.zero = '';
      this.timer = $scope.seconds;
    }

    saveTime(time, lvl) {
      times['lvl'+lvl] = time;
    }
  }
];