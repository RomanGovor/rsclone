import { Rules, Settings } from './js/pages/index';
import { Constants, Extra, Storage } from './js/core/index';
import {
  Playground, SwitchLang, Animations, Player,
} from './js/components/index';

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
    this.player = new Player({ name: 'Pushkin', avatar: 'url(../assets/img/ava1.jpg)' });
    this.player.changeScore(0);

    this.bots = {
      bot1: new Player({
        name: 'Bot 1',
        avatar: 'url(../assets/img/bot.jpg)',
        score: -700,
      }),
      bot2: new Player({
        name: 'Bot 2',
        gender: 'woman',
        avatar: 'url(../assets/img/ava3.jpg)',
        score: 1900,
      }),
      bot3: new Player({
        name: 'Bot 3',
      }),
    };
    this.bots.bot3.changeScore(777);
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

      // this.startMenu.renderByLang(this.language);
      Extra.translate(this.language);
    });

    menuPlaygroundBtn.addEventListener('click', () => {
      const containerGame = document.querySelector('.container__game');
      Extra.hidePages(containerGame);

      this.initPlayground();
      this.addPlayers();
      this.checkAnswerButtonsEvents();
    });

    menuRulesBtn.addEventListener('click', () => {
      const rules = new Rules(this.language);
    });

    menuSettingsBtn.addEventListener('click', () => {
      const container = document.querySelector('.container__settings');
      Extra.hidePages(container);
    });
  }

  checkAnswerButtonsEvents() {
    const answerInput = document.querySelector(Constants.ANSWER_INPUT);
    const playground = document.querySelector(Constants.PLAYGROUND);

    playground.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      if (button.classList.contains('playground__answer-button')) {
        if (answerInput.value !== '') {
          console.log(1);
        }
      }

      if (button.classList.contains(Constants.ANSWER_CHECKBOX)) {
        this.checkTrueAnswer(button);
      }
    });
  }

  checkTrueAnswer(checkbox = undefined) {
    const currentQuestion = Storage.getCurrentQuestion();
    if (currentQuestion.type === 'checkbox') this.checkTrueAnswerCheckbox(checkbox);
    else this.checkTrueAnswerInput();
  }

  checkTrueAnswerCheckbox(checkbox) {
    const currentQuestion = Storage.getCurrentQuestion();

    const span = checkbox.querySelector('span[language=\'en\']');
    if (span.value === currentQuestion.trueAnswerEn) {
      this.updatePlayerScore(currentQuestion.points);
      Extra.playAudio(Constants.AUDIO.CORRECT);
    } else {
      this.updatePlayerScore((-1) * currentQuestion.points);
      Extra.playAudio(Constants.AUDIO.FAILURE);
    }
  }

  updatePlayerScore(num) {
    this.player.changeScore(num);
  }

  checkTrueAnswerInput() {
    console.log('lf');
  }
}

const APP = new App();
