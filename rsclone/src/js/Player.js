class Player {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__players');
    this.name = options.name || 'Player';
    this.gender = options.gender || 'man';
    this.score = options.score || 0;
    this.lang = options.lang || 'en';
    this.render();

    // this.changeScore(500);
    // this.changeScore(-700);
  }

  render() {
    this.player = document.createElement('div');
    this.player.classList = 'player';

    // по идее тут должна быть форма, если будет что-то на бэк отправляться ??
    this.player.innerHTML = `
      <div class='player__controls'>
      <span>Кнопки еще что нужно? как в оригинале пауза/выход ?? </span>
      <button class='player__answer-button'>Кнопочка</button>
      </div>
      <div class='player__info'>
        <div class='player__avatar player__avatar_${this.gender}'></div>
        <span class='player__name'>${this.name}</span>
        <span class='player__score'>${this.score}</span>
      </div>
      `;
    this.container.prepend(this.player);
  }

  changeScore(points) {
    this.score = Number(this.score) + Number(points);
    this.player.querySelector('.player__score').textContent = this.score;
  }
}

export default Player;
