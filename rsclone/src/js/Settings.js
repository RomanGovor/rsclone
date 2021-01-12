import { Constants } from './Constants.js';

export class Settings {
  constructor() {
    // this.isMusic = true;
    this.audio = null;
    this.setSettingsEvents();
    this.playMusic();
  }

  setSettingsEvents() {
    const musicCheckbox = document.querySelector('.checkbox-music');
    const btnBack = document.querySelector('.settings__button-back');

    musicCheckbox.addEventListener('change', () => {
      musicCheckbox.checked ? this.countinueMusic() : this.pauseMusic();
    });

    btnBack.addEventListener('click', () => {
       const container = document.querySelector('.container__settings');
       container.classList.add('none');
    });
  }

  playMusic() {
    this.audio = new Audio(Constants.BACKGROUND_AUDIO);
    this.audio.play();
    this.audio.loop = true;
    this.audio.autoplay = true;
  }

  pauseMusic() {
    this.audio.pause();
  }

  countinueMusic() {
    // this.audio.currentTime = 0;
    this.audio.play();
  }
}
