import createElement from '../createElements/createElement';
import './statistic.scss';
import { Extra, Storage } from '../../core';
import {HeaderMenu} from "../../pages";

export function statisticPage(activePage) {
  const container = document.querySelector('.container__statistic');
  Extra.clearContainer(container);
  Extra.hidePages(container);

  const statisticCloseButton = Extra
    .createMultipleLanguageElement('button',
      ['statistic__close-button'],
      'Back', 'Назад');

  const statisticTitle = Extra
    .createMultipleLanguageElement('h2',
      ['statistic__title'],
      'Your Results', 'Ваши результаты');

  function createLiItem(textEn, textRu, dataCount) {
    const li = document.createElement('li');
    li.classList.add('statistic__item');

    const label = Extra.createMultipleLanguageElement('div',
      ['statistic__item-title'], textEn, textRu);

    const count = document.createElement('div');
    count.classList.add('statistic__item-count');
    count.setAttribute('data-count', dataCount);

    li.append(label, count);

    return li;
  }

  const li1 = createLiItem('Number of games', 'Общее число игр', 'num-games');
  const li2 = createLiItem('Maximum number of wins', 'Максимальное число побед', 'max-num-wins');
  const li3 = createLiItem('Points', 'Очки', 'points');
  const li4 = createLiItem('Average points', 'Среднее количество очков', 'max-num-wins');
  const li5 = createLiItem('Average play time', 'Среднее время игры', 'aver-play-time');
  const li6 = createLiItem('Maximum play time', 'Максимальное время игры', 'max-play-time');

  const statisticList = createElement('ul', 'statistic__list');
  statisticList.append(li1, li2, li3, li4, li5, li6);

  const statisticWrapper = createElement('div', 'statistic', [statisticTitle, statisticList, statisticCloseButton]);

  container.append(statisticWrapper);

  Extra.translate(Storage.getLanguage());

  statisticCloseButton.addEventListener('click', () => {
    Extra.delay(1000).then(() => {
      Extra.hidePages(document.querySelector(activePage));
      HeaderMenu.createActiveListItemByActivePage(activePage);
      Extra.clearContainer(container);
    });
  });
}
