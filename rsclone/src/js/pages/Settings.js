import { Constants, Extra } from '../core/index';

export class Settings {
  constructor() {
    // this.isMusic = true;
    this.audio = null;
    this.setSettingsEvents();
    this.playMusic();
    this.renderAvatars();
  }

  setSettingsEvents() {
    const musicCheckbox = document.querySelector('.checkbox-music');
    const btnBack = document.querySelector('.settings__button-back');

    musicCheckbox.addEventListener('change', () => {
      musicCheckbox.checked ? this.countinueMusic() : this.pauseMusic();
    });

    btnBack.addEventListener('click', () => {
      Extra.delay(1000).then(() => {
        Extra.hidePages(document.querySelector(Constants.MAIN_PAGE));
      });
    });
  }

  renderAvatars() {
    const avatarsContainer = document.createElement('div');
    const btnBack = document.querySelector('.settings__button-back');

    avatarsContainer.classList.add('avatars');
    for (let i = 0; i < 24; i++) {
      const image = new Image(150, 150);
      image.src = `./assets/images/avatars/avatar_${i + 1}.jpg`;
      image.classList.add('avatars__item');
      avatarsContainer.append(image);
    }

    btnBack.before(avatarsContainer);
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
    this.audio.play();
  }
}
