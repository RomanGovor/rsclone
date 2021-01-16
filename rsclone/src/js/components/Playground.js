/* eslint-disable operator-linebreak */
// import {Extra} from "../core/services/Extra.js";
import { Timer } from './Timer';

export class Playground {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__playground');

    this.lang = options.lang || 'en';
    this.allCategoriesEn = options.allCategoriesEn || [];
    this.allCategoriesRu = options.allCategoriesRu || [];
    this.render();
    this.showCategories(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
  }

  render() {
    this.playground = document.createElement('div');
    this.playground.classList = 'playground';
    this.container.append(this.playground);

    this.createTable(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
    this.createButton();
    this.createScoreboard();
    this.createRound();
  }

  createTable(arr) {
    this.table = document.createElement('table');
    this.table.classList = 'playground__table';
    let i = 0;
    // eslint-disable-next-line operator-linebreak
    const str =
      "<td class='cell cell-1'>100</td><td class='cell cell-2'>200</td><td class='cell cell-3'>300</td><td class='cell cell-4'>400</td><td class='cell cell-5'>500</td>";
    this.table.innerHTML = `
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    `;
    this.playground.append(this.table);

    this.bindTableEvent();
  }

  bindTableEvent() {
    this.table.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        e.target.classList.add('blink');

        setTimeout(() => {
          e.target.classList.remove('blink');
          e.target.textContent = '';
        }, 2500);

        setTimeout(() => {
          this.showQuestion({
            type: 'checkbox',
            subtype: 'picture',
            points: 100,
            questionRu: 'Выберите правильный мультфильм по картинке',
            questionEn: 'Choose the right cartoon from the picture',
            questionPicture:
              'https://regnum.ru/uploads/pictures/news/2017/11/22/regnum_picture_1511370887532540_normal.jpg',
            answerOptionsEn: ['Dunno on the Moon', 'Hercules', 'Tarzan', 'Futurama'],
            answerOptionsRu: ['Незнайка на луне', 'Геркулес', 'Тарзан', 'Футурама'],
            trueAnswerEn: 'Dunno on the Moon',
            trueAnswerRu: 'Незнайка на луне',
          });
          this.TIMER = new Timer();
        }, 3000);

        setTimeout(() => {
          this.showTable();
          this.showButton();
          this.hideScoreboard();
        }, 24000);
      }
    });
  }

  showCategories(arr = this.allCategoriesEn, delay = 5) {
    if (this.answerButton && this.table) {
      this.hideTable();
      this.hideButton();
    }

    this.categoriesList = document.createElement('ul');
    this.categoriesList.classList = 'playground__categories-list';
    arr.forEach((el) => {
      const item = document.createElement('li');
      item.classList = 'playground__categories-item';
      item.textContent = el;
      this.categoriesList.append(item);
    });
    this.playground.append(this.categoriesList);

    setTimeout(() => {
      this.categoriesList.classList.add('playground__categories-list_animated');
    }, 0);
    setTimeout(() => {
      this.showRound(1);
    }, delay * 1000);
    setTimeout(() => {
      this.categoriesList.classList.add('none');
      this.showTable();
      this.showButton();
      this.hideScoreboard();
    }, (delay + 3) * 1000);
  }

  createScoreboard() {
    this.scoreboard = document.createElement('div');
    this.scoreboard.classList = 'playground__scoreboard none';

    this.question = document.createElement('p');
    this.question.classList = 'playground__question';
    this.scoreboard.append(this.question);

    const isEnCheckbox = this.lang === 'en' ? '' : ' none';
    const isRuCheckbox = this.lang === 'ru' ? '' : ' none';
    this.answerInput = document.createElement('div');
    this.answerInput.classList = 'playground__answer_input';
    this.answerInput.innerHTML = `
      <input type='text' class='playground__answer-input${isEnCheckbox}' placeholder='enter answer' language='en'>
      <button class='playground__answer-button${isEnCheckbox}' language='en'>Reply</button>
      <input type='text' class='playground__answer-input${isRuCheckbox}' placeholder='введите ответ' language='ru'>
      <button class='playground__answer-button${isRuCheckbox}' language='ru'>Ответить</button>
    `;
    this.scoreboard.append(this.answerInput);

    this.answerCheckbox = document.createElement('div');
    this.answerCheckbox.classList = 'playground__answer_checkbox none';
    this.answerCheckbox.innerHTML = `
      <button class='playground__answer-button-checkbox${isEnCheckbox}' language='en'>Option 1</button>
      <button class='playground__answer-button-checkbox${isEnCheckbox}' language='en'>Option 2</button>
      <button class='playground__answer-button-checkbox${isEnCheckbox}' language='en'>Option 3</button>
      <button class='playground__answer-button-checkbox${isEnCheckbox}' language='en'>Option 4</button>
      <button class='playground__answer-button-checkbox${isRuCheckbox}' language='ru'>Опция 1</button>
      <button class='playground__answer-button-checkbox${isRuCheckbox}' language='ru'>Опция 2</button>
      <button class='playground__answer-button-checkbox${isRuCheckbox}' language='ru'>Опция 3</button>
      <button class='playground__answer-button-checkbox${isRuCheckbox}' language='ru'>Опция 4</button>
    `;
    this.scoreboard.append(this.answerCheckbox);

    this.playground.append(this.scoreboard);

    this.bindAnswerButtonsEvents();
  }

  bindAnswerButtonsEvents() {
    this.answerInput.addEventListener('click', (e) => {
      if (e.target.classList.contains('playground__answer-button')) {
        if (this.answerInput.querySelector('.playground__answer-input').value !== '') {
          this.hideScoreboard();
          this.showTable();
          this.showButton();
        }
      }
    });

    this.answerCheckbox.addEventListener('click', (e) => {
      if (e.target.classList.contains('playground__answer-button-checkbox')) {
        // TODO проверка на правильность ответа нужно сюда
        this.hideScoreboard();
        this.showTable();
        this.showButton();
      }
    });
  }

  showQuestion(question) {
    if (this.table && this.answerButton) {
      this.hideTable();
      this.hideButton();
    }
    if (this.categoriesList) {
      this.hideCategories();
    }
    this.showScoreboard();
    // this.question.textContent = `${question[0]}`;
    const isEn = this.lang === 'en' ? '' : ' none';
    const isRu = this.lang === 'ru' ? '' : ' none';
    const isQuestionPicture = question.questionPicture === undefined ? ' none' : '';
    const isQuestionDescriptionEn =
      question.descriptionEn === undefined ? '' : question.descriptionEn;
    const isQuestionDescriptionRu =
      question.descriptionRu === undefined ? '' : question.descriptionRu;
    this.question.innerHTML = `
      <strong class='playground__question${isEn}' language='en'>${question.questionEn}</strong>
      <strong class='playground__question${isRu}' language='ru'>${question.questionRu}</strong>
      <span class='playground__question-descriptions${isEn}' language='en'>${isQuestionDescriptionEn}</span>
      <span class='playground__question-descriptions${isRu}' language='ru'>${isQuestionDescriptionRu}</span>
      <img src='${question.questionPicture}' class='playground__question-picture${isQuestionPicture}' width=200 height=200>
      <img src='${question.answerPicture}' class='playground__answer-picture none' width=200 height=200>
    `;

    if (question.type === 'checkbox') {
      this.changeAnswerOptionsValue(question.answerOptionsEn, question.answerOptionsRu);
    }

    if (question.type === 'input') {
      this.answerInput.classList.remove('none');
      this.answerCheckbox.classList.add('none');
      this.answerInput.querySelector('.playground__answer-input').value = '';
    } else if (question.type === 'checkbox') {
      this.answerCheckbox.classList.remove('none');
      this.answerInput.classList.add('none');
    }
    // setTimeout(() => {}, 0);
  }

  changeAnswerOptionsValue(OptionsEn, OptionsRu) {
    this.answerCheckbox
      .querySelectorAll('.playground__answer-button-checkbox[language="ru"]')
      .forEach((child, index) => {
        child.textContent = OptionsRu[index];
      });
    this.answerCheckbox
      .querySelectorAll('.playground__answer-button-checkbox[language="en"]')
      .forEach((child, index) => {
        child.textContent = OptionsEn[index];
      });
  }

  showAnswerPicture(picture) {
    if (picture !== undefined) {
      const pict = this.question.querySelector('.playground__answer-picture');
      pict.classList.remove('none');
      setTimeout(() => {
        pict.classList.add('none');
      }, 3000);
    }
  }

  createRound() {
    this.round = document.createElement('h2');
    this.round.textContent = `${this.lang === 'en' ? 'Round' : 'Раунд'} 1`;
    this.round.classList = 'playground__round none';
    this.playground.append(this.round);
  }

  showRound(count = 1) {
    if (this.table && this.answerButton) {
      this.hideTable();
      this.hideButton();
      this.hideScoreboard();
    }
    if (this.categoriesList) {
      this.hideCategories();
    }
    this.round.classList.remove('none');
    this.round.textContent = `${this.lang === 'en' ? 'Round' : 'Раунд'} ${count}`;

    setTimeout(() => {
      this.round.classList.add('none');
      this.showTable();
      this.showButton();
    }, 1000);
  }

  createButton() {
    this.answerButton = document.createElement('button');
    this.answerButton.textContent = '';
    this.answerButton.classList.add('controls__answer-button');
    this.container.append(this.answerButton);
  }

  hideButton() {
    this.answerButton.classList.add('none');
  }

  showButton() {
    this.answerButton.classList.remove('none');
  }

  showScoreboard() {
    // this.showButton();
    this.scoreboard.classList.remove('none');
  }

  hideScoreboard() {
    this.scoreboard.classList.add('none');
  }

  hideCategories() {
    this.categoriesList.classList.add('none');
  }

  hideTable() {
    this.table.classList.add('none');
  }

  showTable() {
    this.table.classList.remove('none');
  }

  clear() {
    this.playground.innerHTML = '';
  }
}
