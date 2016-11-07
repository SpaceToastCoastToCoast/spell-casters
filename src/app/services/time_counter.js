export const TimeCounter = ['duration', 'display',
  class TimeCounter {
    constructor (duration, display) {
      this.duration = 0;
    }

    startTimer(duration, display) {
        this.start = Date.now(),
        this.diff,
        this.minutes,
        this.seconds;
      console.log('start Timer has been called');
      function timerCountDown() {
        console.log('timer started');
          // get the number of seconds that have elapsed since
          // startTimer() was called
          this.diff = this.duration - (((Date.now() - this.start) / 1000) | 0);

          // does the same job as parseInt truncates the float
          this.minutes = (this.diff / 60) | 0;
          this.seconds = (this.diff % 60) | 0;

          this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
          this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

          this.display.textContent = this.minutes + ":" + this.seconds;

          if (this.diff <= 0) {
              // add one second so that the count down starts at the full duration
              // example 05:00 not 04:59
              this.start = Date.now() + 1000;
          }
      };
      // we don't want to wait a full second before the timer starts
      timerCountDown();
      setInterval(timerCountDown, 1000);
    } // eof startTimer


  } //eof service
];