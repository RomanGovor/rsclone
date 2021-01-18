import { Constants } from '../core';

export class Player {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__players');
    this.name = options.name || 'Player';
    this.gender = options.gender || 'man';
    this.score = options.score || 0;
    this.lang = options.lang || 'en';
    this.avatar = options.avatar || null;
    this.status = options.status || Constants.USER_STATUSES.BOT;
    this.isActivePlayer = options.isActivePlayer || false;
    this.render();

    this.bindEvents();
  }

  render() {
    this.player = document.createElement('div');
    this.player.classList = 'player';
    if (this.isActivePlayer) this.player.classList.add('player_active');

    this.player.innerHTML = `
    <div class='player__avatar player__avatar_${this.gender}'></div>
    <div class='player__info'>
    <span class='player__name'>${this.name}</span>
    <span class='player__score'>${this.score}</span>
    </div>
    <div class='player__answer-field none'></div>
      `;
    this.addAvatar();
    this.container.append(this.player);
  }

  changeScore(points) {
    this.score = Number(this.score) + Number(points);
    const player = this.player.querySelector('.player__score');

    player.textContent = this.score;
    player.value = this.score;
  }

  setAvatar(src) {
    if (this.avatar !== null) {
      const ava = this.player.querySelector('.player__avatar');
      ava.setAttribute('style', `background-image: url(${src})`);
    }
  }

  addAvatar() {
    if (this.avatar !== null) {
      const ava = this.player.querySelector('.player__avatar');
      ava.setAttribute('style', `background-image: ${this.avatar}`);
    }
  }

  say(text = 'hello') {
    const answer = this.player.querySelector('.player__answer-field');
    answer.textContent = text;
    answer.classList.remove('none');

    setTimeout(() => {
      answer.classList.add('none');
    }, 3000);
  }

  makePlayerActive() {
    document.querySelectorAll('.player').forEach((el) => el.classList.remove('player_active'));
    this.isActivePlayer = true;
    this.player.classList.add('player_active');
    // if (this.isActivePlayer === true) {
    //   this.player.classList.add('player_active');
    // } else this.player.classList.remove('player_active');
  }

  bindEvents() {
    this.player.addEventListener('click', (e) => {
      if (e.target.classList.contains('player__avatar')) {
        this.say(`hello my name is ${this.name} and I'm ${this.gender} :)`);
        this.makePlayerActive();
      }
    });
  }
}
