import StartMenu from './js/StartMenu';
import Playground from './js/Playground';
import Player from './js/Player';
// import BotsContainer from './js/BotsContainer';
// import Bot from './js/Bot';

class App {
  constructor() {
    this.language = 'en';
    this.setEvents();

    this.startMenu = new StartMenu({
      lang: this.language,
    });
    // this.startMenu.show();

    this.playground = new Playground({});

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
        avatar: 'url(../assets/img/ava2.jpg)',
      }),
    };
    this.bots.bot3.changeScore(777);

    this.bindOpenBurgerHandler();
  }

  setEvents() {
    const switchGameModeBtn = document.querySelector('.switch__checkbox');
    switchGameModeBtn.addEventListener('change', () => {
      const switchEn = document.querySelector('.switch__en');
      const switchRu = document.querySelector('.switch__ru');
      switchRu.classList.toggle('none');
      switchEn.classList.toggle('none');

      this.translateStrings();
      // ?
      if (this.language === 'en') this.language = 'ru';
      else this.language = 'en';
      this.startMenu.renderByLang(this.language);
    });
  }

  translateStrings() {
    const enStings = document.querySelectorAll('[language="en"]');
    const ruStings = document.querySelectorAll('[language="ru"]');
    enStings.forEach((el) => {
      el.classList.toggle('none');
    });
    ruStings.forEach((el) => {
      el.classList.toggle('none');
    });
  }

  bindOpenBurgerHandler() {
    const burger = document.querySelector('.burger-menu__lines');
    burger.addEventListener('click', () => {
      const wrap = document.querySelector('#main');
      console.log('JJJJj ', this.startMenu.isOpen(), wrap);
      if (this.startMenu.isOpen()) {
        this.startMenu.hide();
        wrap.classList.remove('none');
      } else {
        this.startMenu.show();
        wrap.classList.add('none');
      }
    });
  }
}

const APP = new App();
