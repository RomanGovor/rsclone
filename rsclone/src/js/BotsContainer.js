class BotsContainer {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__players');
    this.render();
  }

  render() {
    this.botsContainer = document.createElement('div');
    this.botsContainer.classList.add('bots-container');
    this.container.append(this.botsContainer);
  }

  deleteAllBots() {
    this.botsContainer.innerHTML = '';
  }
}

export default BotsContainer;
