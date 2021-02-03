import { Constants, Extra } from '../core';

export class Player {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__players');
    this.name = options.name || 'Player';
    this.gender = options.gender || 'man';
    this.score = options.score || 0;
    this.lang = options.lang || 'en';
    this.avatar = options.avatar;
    this.status = options.status || Constants.USER_STATUSES.BOT;
    this.isActivePlayer = options.isActivePlayer || false;
    this.workName = options.workName || 'player';
    if (this.status === Constants.USER_STATUSES.BOT) {
      this.botLevel = options.botLevel || Constants.LEVELS_BOTS.LOW;
    }

    this.permissionToAnswer = options.permissionToAnswer || true;
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
    if (this.container) {
      this.container.append(this.player);
    }
  }

  changeScore(points) {
    this.score = Number(this.score) + Number(points);
    const player = this.player.querySelector('.player__score');

    player.textContent = this.score;
    player.value = this.score;

    if (Number(points) < 0) {
      player.classList.add('player__score_error');
      setTimeout(() => {
        player.classList.remove('player__score_error');
      }, 3000);
    } else if (Number(points) > 0) {
      player.classList.add('player__score_true');
      setTimeout(() => {
        player.classList.remove('player__score_true');
      }, 3000);
    }
  }

  setAvatar(src) {
    if (this.avatar !== null) {
      const ava = this.player.querySelector('.player__avatar');
      ava.setAttribute('style', `background-image: url(${src})`);
    }
  }

  addAvatar() {
    if (this.avatar !== undefined && this.avatar !== 'url(undefined)') {
      const ava = this.player.querySelector('.player__avatar');
      ava.setAttribute('style', `background-image: ${this.avatar}`);
    }
  }

  setPermissionToAnswer(newPermision) {
    this.permissionToAnswer = newPermision;
    Extra.changePermission(newPermision);
  }

  getPermissionToAnswer() {
    return this.permissionToAnswer;
  }

  getWorkName() {
    return this.workName;
  }

  getName() {
    return this.name;
  }

  getStatus() {
    return this.status;
  }

  sayPossibleAnswer(lang, isRight, answer) {
    const result = isRight ? 'GOOD' : 'BAD';
    const language = lang.toUpperCase();
    const variants = Constants.USER_RESPONSE_OPTIONS[language][result];
    const choice = variants[Extra.getRandomInt(variants.length) - 1];
    this.say(`${choice.first}${answer.toUpperCase()}${choice.second}`);
  }

  say(text = `Hello. I ${this.name}`) {
    const answer = this.player.querySelector('.player__answer-field');
    answer.textContent = text;
    answer.classList.remove('none');

    setTimeout(() => {
      answer.classList.add('none');
    }, 5000);
  }

  getScore() {
    return {
      score: this.score,
      name: this.name,
      workName: this.workName,
      avatar: this.avatar,
    };
  }

  hideSpeech() {
    const answer = this.player.querySelector('.player__answer-field');
    answer.classList.add('none');
  }

  getActivePlayer() {
    return this.player.classList.contains('player_active');
  }

  makePlayerActive() {
    document.querySelectorAll('.player').forEach((el) => el.classList.remove('player_active'));
    this.isActivePlayer = true;
    this.player.classList.add('player_active');
  }

  bindEvents() {
    this.player.addEventListener('click', (e) => {
      if (e.target.classList.contains('player__avatar')) {
        this.say(`hello my name is ${this.name} and I'm ${this.gender} :)`);
      }
    });
  }
}
