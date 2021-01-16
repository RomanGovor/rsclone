import { Constants } from '../core/Constants';
import { Extra } from '../core/services/Extra';

export class Timer {
  constructor(min = 0, sec = 20) {
    this.renderTimer();

    this.initial = 0;
    this.totalsecs = 0;
    this.perc = 0;
    this.isPaused = false;
    this.mins = min;
    this.seconds = sec;
    this.setTimerEvents();
    this.circumference = 0;
    this.timerCircleInit();
  }

  renderTimer() {
    const container = document.querySelector('.container__active');
    const timer = document.createElement('div');
    timer.classList.add('timer');
    timer.innerHTML = `
      <figure class="clock">
        <div class="clock__mins">0</div>
        <div>:</div>
        <div class="clock__secs">00</div>
        <svg class="clock__progress-ring" height="120" width="120">
        <circle class="progress-ring__circle circle-color" stroke-width="8" fill="transparent" r="50" cx="60" cy="60"/>
        </svg>
      </figure>

      <div class="timer__btn-group">
        <button class="button timer__pause">pause</button>
      </div>
    `;

    container.append(timer);
  }

  timerCircleInit() {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    this.circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = this.circumference;
    circle.style.strokeDashoffset = this.circumference;
  }

  setTimerEvents() {
    // const startBtn = document.querySelector('.timer__start');
    const pauseBtn = document.querySelector('.timer__pause');

    // startBtn.addEventListener('click', () => {
    this.totalsecs = this.mins * 60 + this.seconds;

    console.log(this.totalsecs);

    const bindDecrement = this.decrement.bind(this);
    setTimeout(bindDecrement, 60);
    // startBtn.style.transform = 'scale(0)';
    this.isPaused = false;
    // });

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
    // const startBtn = document.querySelector('.timer__start');
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
      this.perc = 100;
      this.setProgress(this.perc);
      const bell = new Audio(Constants.BELL);
      bell.play();

      Extra.delay(1000).then(() => {
        Extra.clearContainer(document.querySelector('.container__active'));
      });

      // startBtn.classList.remove('timer__break');
      // startBtn.textContent = 'start focus';
      // startBtn.style.transform = 'scale(1)';
      circle.classList.add('circle-color');
    }
  }

  setProgress(percent) {
    const circle = document.querySelector('.progress-ring__circle');
    circle.style.strokeDashoffset = this.circumference - (percent / 100) * this.circumference;
  }
}
