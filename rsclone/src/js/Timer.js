import { Constants } from './Constants.js';

export class Timer {
  constructor() {
    this.initial = 0;
    this.totalsecs = 0;
    this.perc = 0;
    this.isPaused = false;
    this.mins = 0;
    this.seconds = 0;
    this.setTimerEvents();
    this.circumference = 0;
    this.timerCircleInit();
  }

  timerCircleInit() {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    this.circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = this.circumference;
    circle.style.strokeDashoffset = this.circumference;
  }

  setTimerEvents() {
    const startBtn = document.querySelector('.timer__start');
    const pauseBtn = document.querySelector('.timer__pause');

    startBtn.addEventListener('click', () => {
      this.mins = 0.3;
      this.seconds = this.mins * 60;
      this.totalsecs = this.mins * 60;

      const bindDecrement = this.decrement.bind(this);
      setTimeout(bindDecrement, 60);
      startBtn.style.transform = 'scale(0)';
      this.isPaused = false;
    });

    pauseBtn.addEventListener('click', () => {
      if (this.isPaused) {
        const bindDecrement = this.decrement.bind(this);
        this.initial = setTimeout(bindDecrement, 60);
        pauseBtn.textContent = 'pause';
        pauseBtn.classList.remove('timer__resume');
      } else {
        clearTimeout(this.initial);
        pauseBtn.textContent = 'resume';
        pauseBtn.classList.add('timer__resume');
      }
      this.isPaused = !this.isPaused;
    });
  }

  decrement() {
    const mindiv = document.querySelector('.clock__mins');
    const secdiv = document.querySelector('.clock__secs');
    const startBtn = document.querySelector('.timer__start');
    const circle = document.querySelector('.progress-ring__circle');

    mindiv.textContent = Math.floor(this.seconds / 60);
    secdiv.textContent = this.seconds % 60 > 9 ? this.seconds % 60 : `0${this.seconds % 60}`;
    if (circle.classList.contains('timer__danger')) {
      circle.classList.remove('timer__danger');
    }

    if (this.seconds > 0) {
      this.perc = Math.ceil(((this.totalsecs - this.seconds) / this.totalsecs) * 100);
      this.setProgress(this.perc);
      this.seconds--;

      const bindDecrement = this.decrement.bind(this);
      this.initial = setTimeout(bindDecrement, 1000);
      if (this.seconds < 10) {
        circle.classList.remove('circle-color');
        circle.classList.add('timer__danger');
      } else circle.classList.add('circle-color');
    } else {
      this.mins = 0;
      this.seconds = 0;
      this.perc = 100;
      this.setProgress(this.perc);
      const bell = new Audio(Constants.BELL);
      bell.play();

      startBtn.classList.remove('timer__break');
      startBtn.textContent = 'start focus';
      startBtn.style.transform = 'scale(1)';
      circle.classList.add('circle-color');
    }
  }

  setProgress(percent) {
    const circle = document.querySelector('.progress-ring__circle');
    circle.style.strokeDashoffset = this.circumference - (percent / 100) * this.circumference;
  }
}
