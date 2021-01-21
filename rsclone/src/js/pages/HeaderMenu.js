import { Extra } from '../core';

export class HeaderMenu {
  constructor(lang) {
    this.language = lang;
    this.renderHeaderMenu();
    Extra.translate(this.language);
  }

  renderHeaderMenu() {
    this.container = document.querySelector('.burger-menu');

    this.menuList = document.createElement('div');
    this.menuList.classList.add('header__menu-list');

    this.ul = document.createElement('ul');
    this.ul.classList.add('menu-list-ul');

    this.menu = Extra.createMultipleLanguageElement('li',
      ['menu__item', 'menu__item-main-menu', 'active-item'],
      'Main Menu', 'Главное Меню');

    this.settings = Extra.createMultipleLanguageElement('li',
      ['menu__item', 'menu__item-settings'],
      'Settings', 'Настройки');

    this.rules = Extra.createMultipleLanguageElement('li',
      ['menu__item', 'menu__item-rules'],
      'Rules', 'Правила');

    this.statistic = Extra.createMultipleLanguageElement('li',
      ['menu__item', 'menu__item-statistic'],
      'Statistic', 'Статистика');

    this.ul.append(this.menu, this.settings, this.rules, this.statistic);
    this.menuList.append(this.ul);
    this.container.append(this.menuList);
  }

  setActiveItem(newActiveItem) {
    document.querySelectorAll('.menu__item')
      .forEach((el) => el.classList.remove('active-item'));

    newActiveItem.classList.add('active-item');
  }

  deleteActiveItem() {
    document.querySelectorAll('.menu__item')
      .forEach((el) => el.classList.remove('active-item'));
  }
}