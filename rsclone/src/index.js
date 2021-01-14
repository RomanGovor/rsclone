import Playground from './js/components/Playground';
import Player from './js/components/Player';
import { Timer } from './js/components/Timer.js';
import { Extra } from './js/others/Extra.js';
import { Rules } from './js/pages/Rules.js';
import { Settings } from './js/pages/Settings.js';
import { Animations } from './js/animation/Animations.js';
import { Constants } from './js/constants/Constants';

class App {
  constructor() {
    this.language = 'en';
    this.setEvents();

    this.TIMER = new Timer();
    this.SETTINGS = new Settings();
    this.ANIMATIONS = new Animations();

    this.playground = null;
    this.initPlayground();
    this.addPlayers();
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

    switchGameModeBtn.addEventListener('change', () => {
      const switchEn = document.querySelector('.switch__en');
      const switchRu = document.querySelector('.switch__ru');
      switchRu.classList.toggle('none');
      switchEn.classList.toggle('none');
      this.language = this.language === 'en' ? 'ru' : 'en';

      this.translateStrings();
      if (this.language === 'en') this.language = 'ru';
      else this.language = 'en';
      this.startMenu.renderByLang(this.language);
      Extra.translate(this.language);
    });

    menuRulesBtn.addEventListener('click', () => {
      const rules = new Rules(this.language);
    });

    menuSettingsBtn.addEventListener('click', () => {
      const container = document.querySelector('.container__settings');
      container.classList.remove('none');
    });
  }
}

const APP = new App();
