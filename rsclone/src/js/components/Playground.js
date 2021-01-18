/* eslint-disable prefer-destructuring */
/* eslint-disable operator-linebreak */
// import {Extra} from "../core/services/Extra.js";
import { Timer } from './Timer';
import { Constants, Extra } from '../core';
import { Storage } from '../core/services/Storage';

export class Playground {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__playground');

    this.lang = options.lang || 'en';
    this.allCategoriesEn = options.allCategoriesEn || [];
    this.allCategoriesRu = options.allCategoriesRu || [];
    this.package = options.package || {};

    this.categories = this.package.rounds[0].categories;
    this.currentQuestion = null;

    this.render();
    this.showCategories(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
    this.TIMER = null;
  }

  render() {
    this.playground = document.createElement('div');
    this.playground.classList = 'playground';
    this.container.append(this.playground);

    this.createScoreboard();
    this.createTable(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
    this.createRound();
    this.createTrueAnswerField();
  }

  createTable(arr) {
    this.table = document.createElement('table');
    this.table.classList = 'playground__table';

    for (let i = 0; i < this.categories.length; i++) {
      const row = document.createElement('tr');
      row.classList.add(`row-${i + 1}`);

      const th = document.createElement('th');
      th.classList.add(`cell-${i}`);
      th.textContent = arr[i];
      row.append(th);

      for (let j = 0; j < this.categories[i].questions.length; j++) {
        const td = document.createElement('td');
        td.classList.add('cell', `cell-${j + 1}`);
        td.setAttribute('question-row', i);
        td.setAttribute('question-column', j);
        td.textContent = this.categories[i].questions[j].points;
        row.append(td);
      }
      this.table.append(row);
    }

    this.playground.append(this.table);
    this.bindTableEvent();
  }

  bindTableEvent() {
    this.table.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        e.target.classList.add('blink');
        e.target.classList.add('non-clickable');
        this.table.classList.add('non-clickable');

        const row = +e.target.getAttribute('question-row');
        const column = +e.target.getAttribute('question-column');
        this.currentQuestion = this.categories[row].questions[column];
        Storage.setCurrentQuestion(this.currentQuestion);

        Extra.delay(2500)
          .then(() => {
            e.target.classList.remove('blink');
            e.target.textContent = '';
            this.table.classList.remove('non-clickable');
          })
          .then(() => {
            Extra.delay(500)
              .then(() => {
                this.showQuestion(this.currentQuestion);
                this.TIMER = new Timer();
              })
              .then(() => {
                Extra.delay(21000).then(() => {
                  this.showTable();
                  // this.showButton();
                  this.hideScoreboard();
                  this.currentQuestion = null;
                });
              });
          });
      }
    });
  }

  showCategories(arr = this.allCategoriesEn, delay = 5) {
    if (this.table) {
      this.hideTable();
      // this.hideButton();
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
      this.hideScoreboard();
    }, (delay + 3) * 1000);
    this.clearInput();
  }

  clearInput() {
    const inputs = document.querySelectorAll('.playground__answer-input');
    inputs.forEach((input) => {
      input.textContent = '';
      input.value = '';
    });
  }

  createScoreboard() {
    this.scoreboard = document.createElement('div');
    this.scoreboard.classList = 'playground__scoreboard none';

    this.question = document.createElement('p');
    this.question.classList = 'playground__question';
    this.scoreboard.append(this.question);

    this.answerInput = document.createElement('div');
    this.answerInput.classList = 'playground__answer_input';
    this.answerInput.innerHTML = `
      <input type='text' class='playground__answer-input' placeholder='enter answer' language='en'>
      <button class='playground__answer-button' language='en'>Reply</button>
      <input type='text' class='playground__answer-input' placeholder='введите ответ' language='ru'>
      <button class='playground__answer-button' language='ru'>Ответить</button>
    `;
    this.scoreboard.append(this.answerInput);

    this.answerCheckbox = document.createElement('div');
    this.answerCheckbox.classList = 'playground__answer_checkbox none';
    for (let i = 0; i < 4; i++) {
      const button = Extra.createMultipleLanguageElement(
        'button',
        ['playground__answer-button-checkbox'],
        'Info',
        'Инфо',
      );
      this.answerCheckbox.append(button);
    }

    this.scoreboard.append(this.answerCheckbox);
    this.playground.append(this.scoreboard);

    this.bindAnswerButtonsEvents();
    Extra.translate(this.lang);
  }

  bindAnswerButtonsEvents() {
    this.answerInput.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      if (button.classList.contains('playground__answer-button')) {
        if (Extra.checkOnNoEmptyInputs() !== '') {
          this.hideScoreboard();
          this.showTrueAnswer(this.currentQuestion);
          this.TIMER.deleteTimer();
          setTimeout(() => {
            this.showTable();
          }, 3000);
        }
      }
    });

    this.answerCheckbox.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      if (button.classList.contains('playground__answer-button-checkbox')) {
        this.hideScoreboard();
        // this.showTable();
        this.showTrueAnswer(this.currentQuestion);
        this.TIMER.deleteTimer();
        setTimeout(() => {
          this.showTable();
        }, 3000);
      }
    });
  }

  showQuestion(question) {
    if (this.table) {
      this.hideTable();
      // this.hideButton();
    }
    if (this.categoriesList) this.hideCategories();

    this.showScoreboard();
    // this.question.textContent = `${question[0]}`;
    const isQuestionPicture = question.questionPicture === undefined ? ' none' : '';
    const isQuestionDescriptionEn =
      question.descriptionEn === undefined ? '' : question.descriptionEn;
    const isQuestionDescriptionRu =
      question.descriptionRu === undefined ? '' : question.descriptionRu;
    this.question.innerHTML = `
      <strong class='playground__question' language='en'>${question.questionEn}</strong>
      <strong class='playground__question' language='ru'>${question.questionRu}</strong>
      <span class='playground__question-descriptions' language='en'>${isQuestionDescriptionEn}</span>
      <span class='playground__question-descriptions' language='ru'>${isQuestionDescriptionRu}</span>
      <img src='${question.questionPicture}' class='playground__question-picture${isQuestionPicture}' width=200 height=200>
    `;

    if (question.type === 'checkbox') {
      this.changeAnswerOptionsValue(question.answerOptionsEn, question.answerOptionsRu);
    }

    if (question.type === 'input') {
      this.answerInput.classList.remove('none');
      this.answerCheckbox.classList.add('none');
      this.answerInput.querySelector('.playground__answer-input').value = '';
      this.clearInput();
    } else if (question.type === 'checkbox') {
      this.answerCheckbox.classList.remove('none');
      this.answerInput.classList.add('none');
    }
    // setTimeout(() => {}, 0);
    Extra.translate(this.lang);
  }

  createTrueAnswerField() {
    this.trueAnswerField = document.createElement('div');
    this.trueAnswerField.classList = 'playground__true-answer none';

    this.trueAnswerField.innerHTML = `
    <span class='playground__answer-text none' language='en'>en</span>
    <span class='playground__answer-text none' language='ru'>ru</span>
    <img class='playground__answer-picture none' width=200 height=200>
    `;
    this.playground.append(this.trueAnswerField);
  }

  showTrueAnswer(answer) {
    this.hideScoreboard();
    this.hideCategories();
    this.trueAnswerField.classList.remove('none');

    // type = 'text', answer = 'Ответ', lang = this.lang
    const answerEn = this.trueAnswerField.querySelector('.playground__answer-text[language="en"]');
    const answerRu = this.trueAnswerField.querySelector('.playground__answer-text[language="ru"]');

    if (answer.trueAnswerEn && answer.trueAnswerRu) {
      answerEn.textContent = answer.trueAnswerEn;
      answerRu.textContent = answer.trueAnswerRu;
    } else if (answer.trueOptionsAnswerEn && answer.trueOptionsAnswerRu) {
      answerEn.textContent = answer.trueOptionsAnswerEn[0];
      answerRu.textContent = answer.trueOptionsAnswerRu[0];
    }

    if (this.lang === 'en') {
      answerEn.classList.remove('none');
      answerRu.classList.add('none');
    } else {
      answerRu.classList.remove('none');
      answerEn.classList.add('none');
    }

    let pict;
    if (answer.answerPicture) {
      pict = this.trueAnswerField.querySelector('.playground__answer-picture');
      pict.classList.remove('none');
      pict.setAttribute('src', answer.answerPicture);
    }

    setTimeout(() => {
      this.trueAnswerField.classList.add('none');
      answerEn.textContent = '';
      answerRu.textContent = '';
      if (pict) {
        pict.setAttribute('src', '');
        pict.classList.add('none');
      }
      answerEn.classList.add('none');
      answerRu.classList.add('none');
      // this.showTable();
    }, 3000);
  }

  // showAnswerPicture(picture) {
  //   if (picture !== undefined) {
  //     const pict = this.question.querySelector('.playground__answer-picture');
  //     pict.classList.remove('none');
  //     setTimeout(() => {
  //       pict.classList.add('none');
  //     }, 3000);
  //   }
  // }

  changeAnswerOptionsValue(OptionsEn, OptionsRu) {
    this.answerCheckbox
      .querySelectorAll('.playground__answer-button-checkbox span[language="ru"]')
      .forEach((child, index) => {
        child.textContent = OptionsRu[index];
        child.value = OptionsRu[index];
      });

    this.answerCheckbox
      .querySelectorAll('.playground__answer-button-checkbox span[language="en"]')
      .forEach((child, index) => {
        child.textContent = OptionsEn[index];
        child.value = OptionsEn[index];
      });

    Extra.translate(this.lang);
  }

  createRound() {
    this.round = document.createElement('h2');
    this.round.textContent = `${this.lang === 'en' ? 'Round' : 'Раунд'} 1`;
    this.round.classList = 'playground__round none';
    this.playground.append(this.round);
  }

  showRound(count = 1) {
    if (this.table) {
      this.hideTable();
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
    }, 1000);
  }

  showScoreboard() {
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
