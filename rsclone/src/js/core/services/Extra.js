import { Constants } from '../Constants';
import { Storage } from './Storage';

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

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

  static getRandomArray(len, count) {
    const currentArr = (new Array(len)).fill(1).map((a, i) => i);
    const arr = [];
    for (let i = 0; i < count; i++) {
      const removed = currentArr.splice(this.getRandomInt(len - i) - 1, 1);
      arr.push(removed[0]);
    }
    return arr;
  }

  static deleteQuestionFromArray(row, column) {
    const questions = Storage.getQuestionsArray();
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].row === row && questions[i].column === column) {
        questions.splice(i, 1);
        break;
      }
    }

    Storage.setQuestionsArray(questions);
  }

  static checkOnPermission() {
    const question = Storage.getCurrentQuestion();
    return question.isPermissionToAnswer;
  }

  static changePermission(newState) {
    const question = Storage.getCurrentQuestion();
    question.isPermissionToAnswer = newState;
    Storage.setCurrentQuestion(question);
  }

  static createQueueBots(countBots) {
    const times = this.getRandomArray(Constants.QUESTION_TIME / 2, countBots);
    const queue = [];
    for (let i = 0; i < countBots; i++) {
      const obj = {
        bot: `bot${i + 1}`,
        time: times[i],
        initialTimer: null,
      };
      queue.push(obj);
    }
    queue.sort((a, b) => b.time - a.time);
    return queue;
  }
}
