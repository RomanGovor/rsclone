import { Constants, Extra, Storage } from '../core/index';
import { HeaderMenu } from './HeaderMenu';

export class Settings {
  constructor(activePage) {
    this.isMusic = Storage.getPlayBackgroundMusicFlag();
    this.audio = null;
    this.activePage = activePage;
    this.setSettingsEvents();
    this.playMusic();
    this.initDarkMode();
    this.initAudioPlay();
  }

  initAudioPlay() {
    const checkboxAudio = document.querySelector('.settings__audio .settings__checkbox');
    const isAudioPlay = Storage.getAudioPlay();

    if (isAudioPlay) checkboxAudio.checked = true;
  }

  initDarkMode() {
    const darkMode = document.querySelector('.settings__background .settings__checkbox');
    const wrap = document.querySelector('.wrap');
    const isDarkMode = Storage.getDarkMode();

    if (isDarkMode) {
      darkMode.checked = true;
      wrap.classList.add('wrap_mode-dark');
    }
  }

  setActivePage(active) {
    this.activePage = active;
  }

  setSettingsEvents() {
    const musicCheckbox = document.querySelector('.checkbox-music');
    const btnBack = document.querySelector('.settings__button-back');
    const darkMode = document.querySelector('.settings__background .settings__checkbox');
    const checkboxAudio = document.querySelector('.settings__audio .settings__checkbox');
    const wrap = document.querySelector('.wrap');

    musicCheckbox.addEventListener('change', () => {
      musicCheckbox.checked ? this.countinueMusic() : this.pauseMusic();
    });

    checkboxAudio.addEventListener('change', () => {
      Storage.setAudioPlay(checkboxAudio.checked);
    });

    btnBack.addEventListener('click', () => {
      Extra.delay(1000).then(() => {
        Extra.hidePages(document.querySelector(this.activePage));
        HeaderMenu.createActiveListItemByActivePage(this.activePage);
      });
    });

    darkMode.addEventListener('click', () => {
      Storage.setDarkMode(darkMode.checked);
      wrap.classList.toggle('wrap_mode-dark');
    });
  }

  playMusic() {
    this.audio = new Audio(Constants.BACKGROUND_AUDIO);
    this.audio.loop = true;
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
