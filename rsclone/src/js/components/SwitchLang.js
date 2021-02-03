import { Extra, Storage } from '../core';
import { GameParameters } from '../pages';

export class SwitchLang {
  constructor(lang) {
    this.language = lang;
    this.setSwitchBtn();
  }

  setSwitchBtn() {
    const checkbox = document.querySelector('.switch__checkbox');
    const switchEn = document.querySelector('.switch__en');
    const switchRu = document.querySelector('.switch__ru');

    if (this.language === 'ru' && checkbox.checked === false) {
      checkbox.checked = true;
      switchRu.classList.toggle('none');
      switchEn.classList.toggle('none');
    }
  }

  changeLang() {
    const switchEn = document.querySelector('.switch__en');
    const switchRu = document.querySelector('.switch__ru');
    switchRu.classList.toggle('none');
    switchEn.classList.toggle('none');

    this.language = this.language === 'en' ? 'ru' : 'en';
    Storage.setLanguage(this.language);

    GameParameters.changeSelectedOption(this.language);
    Extra.translate(this.language);
    return this.language;
  }
}
