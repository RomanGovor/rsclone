class Playground {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__playground');
    this.lang = options.lang || 'en';
    this.render();
  }

  render() {
    this.playground = document.createElement('div');
    this.playground.classList = 'playground';
    this.playground.innerHTML = '<h1>Playground!!</h1>';
    this.container.prepend(this.playground);
  }
}

export default Playground;
