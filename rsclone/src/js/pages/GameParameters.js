import { Constants, Extra, Storage } from '../core';

export class GameParameters {
  constructor(lang) {
    this.language = lang;
    this.activeAvatar = undefined;
    this.renderParameters();
    this.readingValues();
    Extra.translate(this.language);
  }

  readingValues() {
    const selectBots = document.querySelector('.select-bots');
    const selectLevels = document.querySelector('.select-levels');
    const selectPacks = document.querySelector('.select-packs');

    const param = {
      countBots: parseInt(selectBots.value, 10),
      level: selectLevels.value,
      pack: selectPacks.value,
      avatar: this.activeAvatar,
    };

    Storage.setGameParameters(param);
  }

  renderParameters() {
    const container = document.querySelector('.container__game-param');
    Extra.clearContainer(container);
    Extra.hidePages(container);

    const parameters = document.createElement('div');
    parameters.classList.add('parameters');

    const header = Extra.createMultipleLanguageElement('div',
      ['parameters__header'], 'Game Parameters', 'Параметры Игры');

    const description = document.createElement('div');
    description.classList.add('parameters__description');

    /** ****************************************************************************** */

    const bots = document.createElement('div');
    bots.classList.add('parameters__bots');

    const botsLabel = Extra.createMultipleLanguageElement('div',
      ['parameters__label'], 'Count of bots', 'Число ботов');

    const botsSelect = document.createElement('select');
    botsSelect.classList.add('select', 'select-bots');
    botsSelect.setAttribute('name', 'bots');
    for (let i = 0; i < Constants.MAX_COUNT_OF_BOTS; i++) {
      const option = document.createElement('option');
      option.setAttribute('value', i + 1);
      option.textContent = i + 1;
      if (i + 1 === 3) option.setAttribute('selected', 'selected');
      botsSelect.append(option);
    }

    botsSelect.addEventListener('change', () => { this.readingValues(); });

    bots.append(botsLabel, botsSelect);

    /** ******************************************************************************** */

    const levels = document.createElement('div');
    levels.classList.add('parameters__levels');

    const levelsLabel = Extra.createMultipleLanguageElement('div',
      ['parameters__label'], 'Level of bots', 'Уровень ботов');

    const levelsSelect = document.createElement('select');
    levelsSelect.classList.add('select', 'select-levels');
    levelsSelect.setAttribute('name', 'bots-level');
    levelsSelect.innerHTML = `
          <option value="${Constants.LEVELS_BOTS.LOW}">${Constants.LEVELS_BOTS.LOW}</option>
          <option value="${Constants.LEVELS_BOTS.MIDDLE}" selected>${Constants.LEVELS_BOTS.MIDDLE}</option>
          <option value="${Constants.LEVELS_BOTS.HARD}">${Constants.LEVELS_BOTS.HARD}</option>
        `;

    levelsSelect.addEventListener('change', () => { this.readingValues(); });

    levels.append(levelsLabel, levelsSelect);

    /** ******************************************************************************** */

    const avatars = document.createElement('div');
    avatars.classList.add('parameters__avatars');

    const avatarsLabel = Extra.createMultipleLanguageElement('div',
      ['parameters__label'], 'Select an avatar picture', 'Выберите картинку аватара');

    const containerAvatars = this.renderAvatars();
    avatars.append(avatarsLabel, containerAvatars);

    const packs = this.renderSelectPack();
    description.append(bots, levels, packs);
    /** ******************************************************************************** */

    const btn = this.appendButton();

    parameters.append(header, description, avatars, btn);
    container.append(parameters);
  }

  renderSelectPack() {
    const packs = document.createElement('div');
    packs.classList.add('parameters__packs');

    const packsLabel = Extra.createMultipleLanguageElement('div',
      ['parameters__label'],
      'Choose a package of questions', 'Выберете пак вопросов');

    const packsSelect = document.createElement('select');
    packsSelect.classList.add('select', 'select-packs');
    packsSelect.setAttribute('name', 'packs');

    const keys = Object.keys(Constants.URLS);

    for (let i = 0; i < keys.length; i++) {
      const optionEn = this.createOption('en', keys[i]);
      const optionRu = this.createOption('ru', keys[i]);
      packsSelect.append(optionEn, optionRu);
    }

    if (this.language === 'en') {
      packsSelect.children[0].setAttribute('selected', 'selected');
    } else {
      packsSelect.children[1].setAttribute('selected', 'selected');
    }

    packsSelect.addEventListener('change', () => { this.readingValues(); });
    packs.append(packsLabel, packsSelect);
    return packs;
  }

  static changeSelectedOption(lang) {
    const container = document.querySelector('.container__game-param');
    if (container.childElementCount !== 0) {
      const select = container.querySelector('.select-packs');
      const valueStr = select.value;
      const valueOptions = select.querySelectorAll(`[value=${valueStr}]`);

      valueOptions.forEach((val) => {
        if (val.getAttribute('language') === lang) {
          val.setAttribute('selected', 'selected');
        } else {
          val.removeAttribute('selected');
        }
      });
    }
  }

  createOption(lang, key) {
    const option = document.createElement('option');
    option.setAttribute('value', key);
    option.setAttribute('language', lang);
    option.textContent = Constants.QUIZZES[lang.toUpperCase()][key];

    return option;
  }

  appendButton() {
    const btn = Extra.createMultipleLanguageElement('button',
      ['parameters__button-start'], 'Start', 'Старт');

    function handleClick() {
      const container = document.querySelector('.container__game-param');
      Extra.clearContainer(container);
      Extra.hidePages(document.querySelector(Constants.PLAYGROUND));
      btn.removeEventListener('click', handleClick);
    }

    btn.addEventListener('click', handleClick);
    return btn;
  }

  renderAvatars() {
    const avatarsContainer = document.createElement('div');
    avatarsContainer.classList.add('avatars');

    for (let i = 0; i < Constants.COUNT_DEFAULT_AVATARS; i++) {
      const image = new Image(150, 150);
      image.src = `./assets/images/avatars/avatar_${i + 1}.jpg`;
      image.classList.add('avatars__item');
      avatarsContainer.append(image);
    }

    avatarsContainer.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;

      const oldActive = document.querySelector('.avatars__active');
      if (oldActive) oldActive.classList.remove('avatars__active');

      img.classList.add('avatars__active');
      this.activeAvatar = img.getAttribute('src');
      this.readingValues();
    });

    return avatarsContainer;
  }
}
