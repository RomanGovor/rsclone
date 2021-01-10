class Bot {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__players');
    this.name = options.name || 'Bot';
    this.gender = options.gender || 'man';
    this.score = options.score || 0;
    this.lang = options.lang || 'en';
    this.avatar = options.avatar || null;
    this.render();
  }

  render() {
    this.bot = document.createElement('div');
    this.bot.classList = 'bot';

    this.bot.innerHTML = `<div class='bot__avatar bot__avatar_${this.gender}'></div>
        <span class='bot__name'>${this.name}</span>
        <span class='bot__score'>${this.score}</span>
      `;
    this.addAvatar();
    this.container.append(this.bot);
  }

  changeScore(points) {
    this.score = Number(this.score) + Number(points);
    this.bot.querySelector('.bot__score').textContent = this.score;
  }

  addAvatar() {
    if (this.avatar !== null) {
      const ava = this.bot.querySelector('.bot__avatar');
      ava.setAttribute('style', `background-image: ${this.avatar}`);
    }
  }
}

export default Bot;
