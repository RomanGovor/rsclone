import StartMenu from './js/StartMenu';
import Playground from './js/Playground';
import Player from './js/Player';
import BotsContainer from './js/BotsContainer';
import Bot from './js/Bot';

class App {
  constructor() {
    this.language = 'en';
    this.setEvents();

    this.startMenu = new StartMenu({
      lang: this.language,
    });
    this.startMenu.show();

    this.playground = new Playground({});

    this.player = new Player({ name: 'Sam' });

    this.botsContainer = new BotsContainer({});
    // console.log('this.botsContainer ', this.botsContainer);
    // this.botsContainer.classList.add('bots-container');
    this.bots = {
      bot1: new Bot({
        name: 'Bot 1',
        container: this.botsContainer.botsContainer,
        avatar: 'url(../assets/img/bot.jpg)',
      }),
      bot2: new Bot({
        name: 'Bot 2',
        container: this.botsContainer.botsContainer,
        gender: 'woman',
      }),
      bot3: new Bot({ name: 'Bot 3', container: this.botsContainer.botsContainer }),
    };
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
}

const APP = new App();
