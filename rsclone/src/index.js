import {
  Playground, Player, Timer, Authorization, Animations, SwitchLang,
} from './js/components/index';
import { Rules, Settings } from './js/pages/index';
import { Extra, Constants, Storage } from './js/core/index';

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
    });
  }

  addPlayers() {
    this.player = new Player({ name: 'Pushkin', avatar: 'url(../assets/img/ava1.jpg)' });

    this.player.changeScore(500);

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
        // avatar: 'url(../assets/img/ava2.jpg)',
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
    });

    menuRulesBtn.addEventListener('click', () => {
      // this.language = Storage.getLanguage();
      const rules = new Rules(this.language);
    });

    menuSettingsBtn.addEventListener('click', () => {
      const container = document.querySelector('.container__settings');
      Extra.hidePages(container);
    });
  }
}

const APP = new App();
localStorage.setItem('isAuthorization', false);
localStorage.setItem('token', null);
const authorization = new Authorization();
const authorizationLink = document.querySelector('.menu__item-authorization');
authorizationLink.addEventListener('click', () => authorization.init());
