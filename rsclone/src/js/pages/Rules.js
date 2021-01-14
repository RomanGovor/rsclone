import { Constants } from '../constants/Constants.js';
import { Extra } from '../others/Extra.js';

export class Rules {
  constructor(lang) {
    this.language = lang;
    this.renderRules();
    Extra.translate(this.language);
  }

  renderRules() {
    const container = document.querySelector('.container__rules');
    Extra.clearContainer(container);
    const rules = document.createElement('div');
    rules.classList.add('rules');

    const rulesHeader = document.createElement('div');
    rulesHeader.classList.add('rules__header');
    rulesHeader.innerHTML = `
       <span language="en">Rules of game</span>
       <span language="ru">Правила игры</span>
     `;

    const rulesDescription = document.createElement('div');
    rulesDescription.classList.add('rules__description');

    const descEn = this.appendDescription('en');
    const descRu = this.appendDescription('ru');
    rulesDescription.append(descEn, descRu);

    const btnBack = this.appendButtonBack();

    rules.append(rulesHeader, rulesDescription, btnBack);
    container.append(rules);
  }

  appendButtonBack() {
    const btn = document.createElement('button');
    btn.classList.add('rules__button-back');
    btn.innerHTML = `
       <span language="en">Back</span>
       <span language="ru">Назад</span>
     `;

    function handleClick(event) {
      const container = document.querySelector('.container__rules');
      Extra.clearContainer(container);
      btn.removeEventListener('click', handleClick);
    }

    btn.addEventListener('click', handleClick);

    return btn;
  }

  appendDescription(lang) {
    const desc = document.createElement('div');
    desc.setAttribute('language', lang);
    Constants.RULES[lang].forEach((el) => {
      const p = document.createElement('p');
      p.textContent = el;
      desc.append(p);
    });

    return desc;
  }
}
