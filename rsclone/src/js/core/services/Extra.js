import { Constants } from '../Constants';

export class Extra {
  static translate(lang) {
    const enStings = document.querySelectorAll('[language="en"]');
    const ruStings = document.querySelectorAll('[language="ru"]');

    enStings.forEach((el) => {
      if (lang === 'en') el.classList.remove('none');
      else el.classList.add('none');
    });
    ruStings.forEach((el) => {
      if (lang === 'ru') el.classList.remove('none');
      else el.classList.add('none');
    });
  }

  static clearContainer(container) {
    while (container.childElementCount !== 0) {
      container.removeChild(container.firstChild);
    }
  }

  static delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static hidePages(active) {
    const container = document.querySelector('.wrapper .container');
    for (let i = 0; i < container.childElementCount; i++) {
      const el = container.children[i];
      if (active === el) el.classList.remove('none');
      else el.classList.add('none');
    }
  }

  static createMultipleLanguageElement(type, classList, textEn, textRu) {
    const element = document.createElement(type);
    element.classList.add(...classList);

    const spanEn = this.createSpan('en', textEn);
    const spanRu = this.createSpan('ru', textRu);

    element.append(spanEn, spanRu);
    return element;
  }

  static createSpan(lang, text) {
    const span = document.createElement('span');
    span.setAttribute('language', lang);
    span.textContent = text;
    span.value = text;

    return span;
  }

  static playAudio(src) {
    const audio = new Audio(src);
    audio.play();
  }

  static checkOnNoEmptyInputs() {
    const inputs = document.querySelectorAll(Constants.ANSWER_INPUT);
    let value = '';

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value !== '') value = inputs[i].value;
    }

    return value;
  }

  static getRandomInt(max) { // Get Random Number
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }
}
