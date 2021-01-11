class Playground {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__playground');
    this.lang = options.lang || 'en';
    this.render();
  }

  render() {
    this.playground = document.createElement('div');
    this.playground.classList = 'playground';
    this.playground.innerHTML = 'playground!!';
    this.container.append(this.playground);

    this.answerButton = document.createElement('button');
    this.answerButton.textContent = 'Кнопочка';
    this.answerButton.classList.add('controls__answer-button');
    this.container.append(this.answerButton);
  }
}

export default Playground;

// this.additionalButtons = document.createElement('div');
// this.additionalButtons.classList = 'controls__additional-buttons';
// this.container.append(this.additionalButtons);

// this.pauseButton = document.createElement('button');
// this.pauseButton.classList = 'controls__pause-button';
// this.additionalButtons.append(this.additionalButtons);
// this.Button = document.createElement('button');
// this.Button.classList = 'controls__pause-button';
// this.additionalButtons.append(this.additionalButtons);
