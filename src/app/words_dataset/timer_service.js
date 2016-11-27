const minuteLimit = 0.5;

export const TimerService = [
  'numberToString',
  class TimerService {
    constructor(numberToString) {
      'ngInject';
      //timer controls
      this.minutes = 0;
      this.seconds = '30';
      this.zero = '';
      this.timer = minuteLimit * 60;
      this.countDown;

      this.isTimerStopped = false;

      this.times = {
        lvl1: 0,
        lvl2: 0,
        lvl3: 0,
        lvl4: 0
      }

      this.resumeTimer = this.resumeTimer.bind(this);
      this.killTimer = this.killTimer.bind(this);
      this.numberToString = numberToString;

      this.tick = () => {}; // will be overwritten

      this.resetGame = this.resetGame.bind(this)
    }

    startTimer() {
      this.resetGame();
      this.resumeTimer();
    }

    killTimer() {
      clearInterval(this.countDown);
      this.isTimerStopped = true;
    }

    resumeTimer() {
      this.isTimerStopped = false;
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

    resetTimer() {
      this.minutes = 0;
      this.seconds = '30';
      this.zero = '';
      this.timer = minuteLimit * 60;
    }

    saveTime(time, lvl) {
      this.times['lvl'+lvl] += time;
    }

    resetGame() {
      this.resetTimer();
      this.killTimer();

      this.times = {
        lvl1: 0,
        lvl2: 0,
        lvl3: 0,
        lvl4: 0
      }
    }
  }
];