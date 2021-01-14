// import StartMenu from './js/StartMenu';
import Playground from './js/Playground';
import Player from './js/Player';

class App {
  constructor() {
    this.language = 'en';
    this.setEvents();

    this.playground = new Playground({
      lang: this.language,
      allCategoriesEn: [
        'Cat1',
        'Cat2',
        'Cat3',
        'Cat4',
        'Cat5',
        'Cat1',
        'Cat2',
        'Cat3',
        'Cat4',
        'Cat5',
      ],
      allCategoriesRu: ['Кат1', 'Кат2', 'Кат3', 'Кат4', 'Кат5'],
    });

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
