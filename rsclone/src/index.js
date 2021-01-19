import {
  Playground,
  Player,
  Authorization,
  Animations,
  SwitchLang,
} from './js/components/index';
import { Rules, Settings } from './js/pages/index';
import {
  Extra,
  Constants,
  Storage,
  setUserAuthorizationData,
  removeUserAuthorizationData,
  Request,
} from './js/core/index';

class App {
  constructor() {
    this.language = Storage.getLanguage();
    this.SWITCHLANG = new SwitchLang(this.language);

    this.setEvents();

    this.SETTINGS = new Settings();
    this.ANIMATIONS = new Animations();

    this.playground = null;
    Extra.hidePages(document.querySelector(Constants.MAIN_PAGE));
    Extra.translate(this.language);
  }

  async initPlayground() {
    const categoriesEn = [];
    const categoriesRu = [];
    const response = await fetch(Constants.URLS.categories);
    const data = await response.json();
    await data.rounds.forEach((el) => {
      el.categories.forEach((cat) => {
        categoriesEn.push(cat.categoryInfo.categoryNameEn);
        categoriesRu.push(cat.categoryInfo.categoryNameRu);
      });
    });

    this.playground = new Playground({
      lang: this.language,
      allCategoriesEn: categoriesEn,
      allCategoriesRu: categoriesRu,
      package: data,
    });
  }

  addPlayers() {
    this.player = new Player({
      name: 'Pushkin',
      avatar: 'url(../assets/img/ava1.jpg)',
      status: Constants.USER_STATUSES.PLAYER,
      isActivePlayer: true,
    });
    this.player.changeScore(0);

    this.bots = {};
    for (let i = 0; i < Constants.MAX_COUNT_OF_BOTS; i++) {
      this.bots[`bot${i + 1}`] = new Player({
        name: Constants.NICKNAMES_BOTS[Extra
          .getRandomInt(Constants.NICKNAMES_BOTS.length) - 1],
        avatar: `url(../assets/images/avatars/avatar_${Extra.getRandomInt(
          Constants.COUNT_DEFAULT_AVATARS,
        )}.jpg)`,
        score: 0,
      });
    }
  }

  setEvents() {
    const switchGameModeBtn = document.querySelector('.switch__checkbox');
    const menuRulesBtn = document.querySelector('.menu-rules');
    const menuSettingsBtn = document.querySelector('.menu-settings');
    const menuPlaygroundBtn = document.querySelector('.menu-single-player');

    switchGameModeBtn.addEventListener('change', () => {
      const switchEn = document.querySelector('.switch__en');
      const switchRu = document.querySelector('.switch__ru');
      switchRu.classList.toggle('none');
      switchEn.classList.toggle('none');

      this.language = this.language === 'en' ? 'ru' : 'en';
      Storage.setLanguage(this.language);

      Extra.translate(this.language);
    });

    menuPlaygroundBtn.addEventListener('click', () => {
      const containerGame = document.querySelector('.container__game');
      Extra.hidePages(containerGame);

      this.initPlayground();
      this.addPlayers();
      this.checkAnswerButtonsEvents();
      this.clickPlaygroundTableEvents();
    });

    menuRulesBtn.addEventListener('click', () => {
      const rules = new Rules(this.language);
    });

    menuSettingsBtn.addEventListener('click', () => {
      const container = document.querySelector('.container__settings');
      Extra.hidePages(container);
    });
  }

  clickPlaygroundTableEvents() {
    const playground = document.querySelector(Constants.PLAYGROUND);
    playground.addEventListener('click', (e) => {
      if (e.target.classList.contains(Constants.CELL)) {
        this.queueBots = Extra.createQueueBots(Constants.MAX_COUNT_OF_BOTS);
        for (let i = 0; i < this.queueBots.length; i++) {
          this.queueBots[i].initialTimer = setTimeout(() => {
            this.bots[this.queueBots[i].bot].say();
          }, (this.queueBots[i].time
              + Constants.QUESTION_START_ANIMATION_TIME
              + Constants.QUESTION_TIME / 2) * 1000);
        }
      }
    });
  }

  checkAnswerButtonsEvents() {
    const playground = document.querySelector(Constants.PLAYGROUND);

    playground.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      this.player.setPermissionToAnswer(Extra.checkOnPermission());

      if (!button || !this.player.getPermissionToAnswer()) return;

      if (button.classList.contains('playground__answer-button')) {
        const value = Extra.checkOnNoEmptyInputs();
        if (value !== '') this.checkTrueAnswer(value);
      }

      if (button.classList.contains(Constants.ANSWER_CHECKBOX)) {
        this.checkTrueAnswer(button);
      }
    });
  }

  checkTrueAnswer(element = undefined) {
    const currentQuestion = Storage.getCurrentQuestion();
    if (currentQuestion.type === 'checkbox') this.checkTrueAnswerCheckbox(element);
    else this.checkTrueAnswerInput(element);
  }

  checkTrueAnswerCheckbox(checkbox) {
    const currentQuestion = Storage.getCurrentQuestion();
    const span = checkbox.querySelector("span[language='en']");

    if (span.value === currentQuestion.trueAnswerEn) {
      this.updatePlayerScore(currentQuestion.points, true, span.value);
      Extra.playAudio(Constants.AUDIO.CORRECT);
      this.playground.hideQuestion(true, Constants.USER_STATUSES.PLAYER);
    } else {
      this.updatePlayerScore((-1) * currentQuestion.points, false, span.value);
      Extra.playAudio(Constants.AUDIO.FAILURE);
      this.playground.hideQuestion(false, Constants.USER_STATUSES.PLAYER);
    }
  }

  checkTrueAnswerInput(input) {
    const value = input.trim().toLowerCase();

    const currentQuestion = Storage.getCurrentQuestion();
    const answersArray = [
      ...currentQuestion.trueOptionsAnswerEn,
      ...currentQuestion.trueOptionsAnswerRu,
    ].map((str) => str.trim().toLowerCase());
    let isCorrect = false;

    for (let i = 0; i < answersArray.length; i++) {
      if (value === answersArray[i]) {
        isCorrect = true;
        this.updatePlayerScore(currentQuestion.points, isCorrect, input);
        Extra.playAudio(Constants.AUDIO.CORRECT);
        this.playground.hideQuestion(isCorrect, Constants.USER_STATUSES.PLAYER);
        break;
      }
    }
    if (!isCorrect) {
      this.updatePlayerScore((-1) * currentQuestion.points, isCorrect, input);
      Extra.playAudio(Constants.AUDIO.FAILURE);
      this.playground.hideQuestion(isCorrect, Constants.USER_STATUSES.PLAYER);
    }
  }

  updatePlayerScore(num, isRight, answer) {
    this.player.changeScore(num);
    this.player.sayPossibleAnswer(this.language, isRight, answer);
    if (!isRight) this.player.setPermissionToAnswer(false);
    else this.resetTimerOfBots();
  }

  resetTimerOfBots() {
    this.queueBots.forEach((bot) => {
      clearTimeout(bot.initialTimer);
    });
  }
}

const APP = new App();
if (localStorage.getItem('isAuthorization') === null) {
  localStorage.setItem('isAuthorization', 'false');
  localStorage.setItem('token', null);
}
const authorization = new Authorization();
const request = new Request();
const logoutLink = document.querySelector('.header__userAuthotization');
logoutLink.addEventListener('click', () => {
  if (logoutLink.textContent === 'Log out') {
    request.logout();
    // removeUserAuthorizationData();
  } else if (logoutLink.textContent === 'Log in') {
    authorization.init();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('isAuthorization') === 'false') {
    authorization.init();
  } else {
    setUserAuthorizationData();
  }
});
