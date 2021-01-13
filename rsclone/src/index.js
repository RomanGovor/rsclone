import { Timer } from './js/Timer.js';
import { Extra } from './js/Extra.js';
import { Rules } from './js/Rules.js';
import { Settings } from './js/Settings.js';
import { Animations } from './js/Animations.js';

class App {
  constructor() {
    this.language = 'en';
    this.setEvents();
    this.TIMER = new Timer();
    this.SETTINGS = new Settings();
    this.ANIMATIONS = new Animations();
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
