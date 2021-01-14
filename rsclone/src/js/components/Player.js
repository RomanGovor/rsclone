class Player {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__players');
    this.name = options.name || 'Player';
    this.gender = options.gender || 'man';
    this.score = options.score || 0;
    this.lang = options.lang || 'en';
    this.avatar = options.avatar || null;
    this.render();

    this.bindEvents();
  }

  render() {
    this.player = document.createElement('div');
    this.player.classList = 'player';

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
    this.player.querySelector('.player__score').textContent = this.score;
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

  bindEvents() {
    this.player.addEventListener('click', (e) => {
      if (e.target.classList.contains('player__avatar')) {
        this.say(`hello my name is ${this.name} and I'm ${this.gender} :)`);
      }
    });
  }
}

export default Player;
