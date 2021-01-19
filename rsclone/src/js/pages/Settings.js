import { Constants, Extra, Storage } from '../core/index';

export class Settings {
  constructor() {
    this.isMusic = Storage.getPlayBackgroundMusicFlag();
    this.audio = null;
    this.setSettingsEvents();
    this.playMusic();
  }

  setSettingsEvents() {
    const musicCheckbox = document.querySelector('.checkbox-music');
    const btnBack = document.querySelector('.settings__button-back');

    musicCheckbox.addEventListener('change', () => {
      // eslint-disable-next-line no-unused-expressions
      musicCheckbox.checked ? this.countinueMusic() : this.pauseMusic();
    });

    btnBack.addEventListener('click', () => {
      Extra.delay(1000).then(() => {
        Extra.hidePages(document.querySelector(Constants.MAIN_PAGE));
      });
    });
  }

  playMusic() {
    this.audio = new Audio(Constants.BACKGROUND_AUDIO);
    // if (this.isMusic) {
    //   this.audio.play();
    //   // this.audio.autoplay = true;
    // }
    this.audio.loop = true;
    // this.setMusicCheckbox();
  }

  setMusicCheckbox() {
    const musicCheckbox = document.querySelector('.checkbox-music');
    musicCheckbox.checked = this.isMusic;
  }

  pauseMusic() {
    Storage.setPlayBackgroundMusicFlag(false);
    this.audio.pause();
  }

  countinueMusic() {
    Storage.setPlayBackgroundMusicFlag(true);
    this.audio.play();
  }
}
