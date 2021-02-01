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
    this.countRounds = this.package.rounds.length;
    this.currentRound = 1;

    this.render();
    this.showCategories(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
    this.getQuestionsArrayByRound();
  }

  getCountRounds() {
    return this.countRounds;
  }

  getQuestionsArrayByRound() {
    const questions = [];
    this.package.rounds[this.currentRound - 1].categories.forEach((cat, row) => {
      cat.questions.forEach((quest, column) => {
        const coords = {
          row: row + 1,
          column: column + 1,
        };
        questions.push(coords);
      });
    });

    Storage.setQuestionsArray(questions);
  }

  render() {
    this.playground = document.createElement('div');
    this.playground.classList = 'playground';
    this.container.append(this.playground);

    this.createScoreboard();
    this.createTable();
    this.createRound();
    this.createTrueAnswerField();
    this.createSound();
    this.createWinner();
  }

  createSound() {
    this.audioObj = new Audio();
    this.audioObj.setAttribute('src', null);
  }

  createTable() {
    this.lang = Storage.getLanguage();

    this.table = null;
    this.table = document.createElement('table');
    this.table.classList = 'playground__table';

    for (let i = 0; i < this.categories.length; i++) {
      const row = document.createElement('tr');
      row.classList.add(`row-${i + 1}`);

      const th = Extra.createMultipleLanguageElement(
        'th',
        [`cell-${i}`],
        this.categories[i].categoryInfo.categoryNameEn,
        this.categories[i].categoryInfo.categoryNameRu,
      );
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

    const childesPlayground = this.playground.children;
    for (let i = 0; i < childesPlayground.length; i++) {
      const child = childesPlayground[i];
      if (child.localName === 'table') {
        this.playground.removeChild(child);
      }
    }
    this.playground.append(this.table);

    Extra.translate(this.lang);
  }

  getCellActive() {
    const arr = this.table.querySelectorAll('.cell');
    let active;
    let isFirstActive = false;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].classList.contains('key-active')) {
        active = arr[i];
      }
    }

    if (!active) {
      this.makeCellActive(arr[0]);
      active = arr[0];
      isFirstActive = true;
    }

    return {
      active,
      isFirstActive,
    };
  }

  makeCellActive(cell) {
    this.clearCellActive();
    cell.classList.add('key-active');
  }

  clearCellActive() {
    const arr = this.table.querySelectorAll('.cell');
    arr.forEach((el) => el.classList.remove('key-active'));
  }

  findCellByCoordinates(row, column) {
    const cells = this.table.querySelectorAll('[question-row]');
    let cell = null;

    for (let i = 0; i < cells.length; i++) {
      const cellRow = +cells[i].getAttribute('question-row');
      const cellColumn = +cells[i].getAttribute('question-column');
      if (cellRow === row && cellColumn === column) {
        cell = cells[i];
        break;
      }
    }

    return cell;
  }

  clickOnTable(cell) {
    cell.classList.add('blink');
    cell.classList.add('non-clickable');
    this.table.classList.add('non-clickable');

    const row = +cell.getAttribute('question-row');
    const column = +cell.getAttribute('question-column');
    Extra.deleteQuestionFromArray(row + 1, column + 1);

    this.currentQuestion = this.categories[row].questions[column];
    this.currentQuestion.row = row;
    this.currentQuestion.column = column;
    this.currentQuestion.isPermissionToAnswer = true;
    this.currentQuestion.round = this.currentRound;
    Storage.setCurrentQuestion(this.currentQuestion);

    Extra.delay(2500)
      .then(() => {
        cell.classList.remove('blink');
        cell.textContent = '';
        this.table.classList.remove('non-clickable');
      })
      .then(() => {
        Extra.delay(500)
          .then(() => {
            this.showQuestion(this.currentQuestion);
            if (this.TIMER === null || this.TIMER === undefined) {
              this.TIMER = new Timer();
            } else {
              this.TIMER.deleteTimer();
              this.TIMER = new Timer();
            }
          })
          .then(() => {
            Extra.delay((Constants.QUESTION_TIME + 1) * 1000).then(() => {
              if (this.currentQuestion) {
                if (this.currentQuestion.row === row && this.currentQuestion.column === column) {
                  this.hideScoreboard();
                  this.showTrueAnswer(this.currentQuestion);
                  this.currentQuestion = null;

                  setTimeout(() => {
                    if (!this.isLastQuestion()) this.showTable();
                    else this.updateStatePlayground();
                  }, 3000);
                }
              }
            });
          });
      });
  }

  clearCurrentQuestion() {
    this.currentQuestion = null;
  }

  isLastQuestion() {
    const questions = Storage.getQuestionsArray();
    if (questions.length === 0 || !questions) return true;
    return false;
  }

  updateStatePlayground() {
    if (this.countRounds !== this.currentRound) {
      this.currentRound += 1;
      this.categories = this.package.rounds[this.currentRound - 1].categories;
      this.createTable();
      this.getQuestionsArrayByRound();
      this.showRound();
    }
  }

  showCategories(arr = this.allCategoriesEn, delay = 5) {
    this.lang = Storage.getLanguage();

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
      this.showRound();
    }, delay * 1000);

    setTimeout(() => {
      this.categoriesList.classList.add('none');
      this.showTable();
      this.hideScoreboard();
    }, (delay + 3) * 1000);
    this.clearInput();

    Extra.translate(this.lang);
  }

  clearInput() {
    const inputs = document.querySelectorAll('.playground__answer-input');
    inputs.forEach((input) => {
      input.textContent = '';
      input.value = '';
    });
  }

  createScoreboard() {
    this.lang = Storage.getLanguage();

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

    Extra.translate(this.lang);
  }

  deleteTimersAndResettingPlayground() {
    if (this.TIMER !== null && this.TIMER !== undefined) {
      this.TIMER.deleteTimer();
    }
  }

  hideQuestion(isCorrect, user) {
    if (isCorrect) {
      this.clearInput();
      this.hideScoreboard();
      this.showTrueAnswer(this.currentQuestion);
      this.clearCurrentQuestion();

      if (this.TIMER !== null && this.TIMER !== undefined) {
        this.TIMER.deleteTimer();
      }

      setTimeout(() => {
        if (!this.isLastQuestion()) this.showTable();
        else this.updateStatePlayground();
      }, Constants.TIME_SHOW_ANSWER * 1000);
    } else if (user === Constants.USER_STATUSES.PLAYER) {
      if (this.answerInput) this.answerInput.classList.add('disabled');
      if (this.answerCheckbox) this.answerCheckbox.classList.add('disabled');
    }
  }

  showQuestion(question) {
    this.lang = Storage.getLanguage();

    if (this.answerInput) this.answerInput.classList.remove('disabled');
    if (this.answerCheckbox) this.answerCheckbox.classList.remove('disabled');
    if (this.table) this.hideTable();
    if (this.categoriesList) this.hideCategories();

    this.showScoreboard();
    const isQuestionPicture = question.questionPicture === undefined ? ' none' : '';
    const isQuestionDescriptionEn = question.descriptionEn === undefined ? '' : question.descriptionEn;
    const isQuestionDescriptionRu = question.descriptionRu === undefined ? '' : question.descriptionRu;
    const title = this.lang === 'en' ? 'Repeat sound' : 'Повторить звук';

    const picture = question.questionPicture === undefined
      ? Constants.DEFAULT_IMG : question.questionPicture;

    this.question.innerHTML = `
      <strong class='playground__question' language='en'>${question.questionEn}</strong>
      <strong class='playground__question' language='ru'>${question.questionRu}</strong>
      <span class='playground__question-descriptions' language='en'>${isQuestionDescriptionEn}</span>
      <span class='playground__question-descriptions' language='ru'>${isQuestionDescriptionRu}</span>
      <img src='${picture}' class='playground__question-picture${isQuestionPicture}' width=200 height=200>
      <div class='playground__question-repeat none'>
        <div class='playground__question-repeat-bg'></div>
        <img src='../../assets/icons/repeat.png' class='playground__question-repeat-button' title='${title}' width=100 height=100>
      </div>
      `;

    const repeat = this.question.querySelector('.playground__question-repeat');
    const repeatButton = this.question.querySelector('.playground__question-repeat-button');
    repeat.classList.add('none');

    if (question.subtype === 'sound') {
      this.audioObj.setAttribute(
        'src',
        `../../assets/audio/${this.currentQuestion.trueOptionsAnswerEn[0]}.mp3`,
      );
      this.audioObj.play();
      repeat.classList.remove('none');
      repeatButton.addEventListener('click', () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.audioObj.play();
      });
    }

    if (question.type === 'input') {
      this.answerInput.classList.remove('none');
      this.answerCheckbox.classList.add('none');
      this.answerInput.querySelector('.playground__answer-input').value = '';
      this.clearInput();
    } else if (question.type === 'checkbox') {
      this.changeAnswerOptionsValue(question.answerOptionsEn, question.answerOptionsRu);
      this.answerCheckbox.classList.remove('none');
      this.answerInput.classList.add('none');
    }

    Extra.translate(this.lang);
  }

  createTrueAnswerField() {
    this.lang = Storage.getLanguage();
    this.trueAnswerField = document.createElement('div');
    this.trueAnswerField.classList = 'playground__true-answer none';

    this.trueAnswerField.innerHTML = `
    <span class='playground__answer-text none' language='en'>en</span>
    <span class='playground__answer-text none' language='ru'>ru</span>
    <img class='playground__answer-picture none' width=200 height=200>
    `;
    this.playground.append(this.trueAnswerField);
    Extra.translate(this.lang);
  }

  showTrueAnswer(answer) {
    this.hideScoreboard();
    this.hideCategories();
    this.trueAnswerField.classList.remove('none');

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
    }, Constants.TIME_SHOW_ANSWER * 1000);
  }

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

    this.lang = Storage.getLanguage();
    Extra.translate(this.lang);
  }

  createRound() {
    this.round = document.createElement('div');
    this.round.classList = 'playground__round none';

    const roundTitle = document.createElement('h2');
    roundTitle.classList.add('playground__round-title');

    const roundInfo = document.createElement('span');
    roundInfo.classList.add('playground__round-info');

    this.round.append(roundTitle);
    this.round.append(roundInfo);
    this.playground.append(this.round);
  }

  showRound() {
    this.lang = Storage.getLanguage();
    Extra.playAudio(Constants.AUDIO.NEW_ROUND);

    if (this.table) {
      this.hideTable();
      this.hideScoreboard();
    }

    if (this.categoriesList) this.hideCategories();

    this.round.classList.remove('none');

    const title = this.round.querySelector('.playground__round-title');
    title.textContent = `${this.lang === 'en' ? 'Round' : 'Раунд'} ${this.currentRound}`;
    const info = this.round.querySelector('.playground__round-info');
    const translate = this.package.rounds[this.currentRound - 1].roundInfo;
    info.textContent = `${this.lang === 'en' ? `${translate.subtopicEn}` : `${translate.subtopicRU}`}`;

    setTimeout(() => {
      this.round.classList.add('none');
      this.showTable();
    }, 2000);
  }

  createWinner() {
    this.winner = document.createElement('div');
    this.winner.classList = 'playground__winner none';
    this.playground.append(this.winner);
  }

  showWinner(winner, time) {
    this.hideWinner();
    this.hideTable();
    this.hideQuestion();
    this.hideScoreboard();
    this.hideCategories();
    this.trueAnswerField.classList.add('none');

    this.winner.classList.remove('none');
    const isNoneEn = this.lang === 'en' ? '' : ' none';
    const isNoneRu = this.lang === 'ru' ? '' : ' none';
    this.winner.innerHTML = `
    <h2 class='playground__winner-title${isNoneEn}' language='en'>Winner: ${winner.name}</h2>
    <h2 class='playground__winner-title${isNoneRu}' language='ru'>Победитель: ${winner.name}</h2>
    <div class='player__avatar playground__winner-avatar' style='background-image: ${winner.avatar}'></div>
    <span class='playground__winner-score${isNoneEn}' language='en'>Points: ${winner.score}</span>
    <span class='playground__winner-score${isNoneRu}' language='ru'>Очки: ${winner.score}</span>
    <span class='playground__winner-time${isNoneEn}' language='en'>Total playing time: ${time.hour}:${time.min}:${time.sec}</span>
    <span class='playground__winner-time${isNoneRu}' language='ru'>Общее время игры: ${time.hour}:${time.min}:${time.sec}</span>
    <button class='playground__winner-button${isNoneEn}' language='en'>Exit</button>
    <button class='playground__winner-button${isNoneRu}' language='ru'>Выйти</button>
    <img class='playground__winner-icon' src='../../assets/icons/trophy.png'>
    `;
  }

  hideWinner() {
    this.winner.classList.add('none');
    this.winner.innerHTML = '';
  }

  showScoreboard() {
    this.lang = Storage.getLanguage();
    this.scoreboard.classList.remove('none');
    Extra.translate(this.lang);
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
    this.lang = Storage.getLanguage();
    this.table.classList.remove('none');
    Extra.translate(this.lang);
  }

  clear() {
    this.playground.innerHTML = '';
  }
}
