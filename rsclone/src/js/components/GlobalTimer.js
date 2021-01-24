import { Extra } from '../core';

export class GlobalTimer {
  constructor(lang) {
    this.language = lang;
    this.totalTime = -1;
    this.renderTimer();
    this.setTimer();
    Extra.translate(this.language);
  }

  renderTimer() {
    const container = document.querySelector('.container__global-timer');
    Extra.clearContainer(container);

    this.globalTimer = document.createElement('div');
    this.globalTimer.classList.add('global-timer');

    this.header = Extra.createMultipleLanguageElement(
      'div',
      ['global-timer__header'],
      'Total playing time',
      'Общее время игры',
    );

    this.time = this.renderTime('00', '00', '00');

    this.globalTimer.append(this.header, this.time);
    container.append(this.globalTimer);
  }

  renderTime(hh, mm, ss) {
    const time = document.createElement('time');
    time.classList.add('time');

    const spanHH = document.createElement('span');
    spanHH.textContent = hh;

    const spanMM = document.createElement('span');
    spanMM.textContent = mm;

    const spanSS = document.createElement('span');
    spanSS.textContent = ss;

    const delimiter1 = document.createElement('span');
    delimiter1.textContent = ':';

    const delimiter2 = document.createElement('span');
    delimiter2.textContent = ':';

    time.append(spanHH, delimiter1);
    time.append(spanMM, delimiter2, spanSS);
    return time;
  }

  setTimer() {
    if (this.initialTimer) this.clearTimer();

    this.initialTimer = setInterval(() => {
      this.totalTime += 1;
      const time = this.divisionIntoMinutes();

      document.querySelector('.time').replaceWith(this.renderTime(time.hour, time.min, time.sec));
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.initialTimer);
    this.initialTimer = null;
  }

  getTotalTime() {
    return this.totalTime;
  }

  divisionIntoMinutes() {
    const time = {};

    this.seconds = this.totalTime % 60;
    this.minutes = ((this.totalTime - this.seconds) / 60) % 60;
    this.hours = (this.totalTime - this.seconds - this.minutes * 60) % 3600;

    time.sec = this.addZero(this.seconds);
    time.min = this.addZero(this.minutes);
    time.hour = this.addZero(this.hours);

    return time;
  }

  addZero(num) {
    return num >= 10 ? `${num}` : `0${num}`;
  }
}
