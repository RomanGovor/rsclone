import createElement from '../createElements/createElement';
import './statistic.scss';

export function statisticPage() {
  const statisticCloseButton = createElement('button', 'statistic__close-button');
  statisticCloseButton.innerHTML = 'X';
  const statisticTitle = createElement('h2', 'statistic__title');
  statisticTitle.innerHTML = 'Your Results';
  const statisticItems = `
  <li class="statistic__item">
    <h4 class="statistic__item-title">Number of games</h4>
    <div class="statistic__item-count" data-count="num-games"></div>
  </li>
  <li class="statistic__item">
    <h4 class="statistic__item-title">Maximum number of wins</h4>
    <div class="statistic__item-count" data-count="max-num-wins"></div>
  </li>
  <li class="statistic__item">
    <h4 class="statistic__item-title">Points</h4>
    <div class="statistic__item-count" data-count="points"></div>
  </li>
  <li class="statistic__item">
    <h4 class="statistic__item-title">Average points</h4>
    <div class="statistic__item-count" data-count="max-num-wins"></div>
  </li>
  <li class="statistic__item">
    <h4 class="statistic__item-title">Average play time</h4>
    <div class="statistic__item-count" data-count="aver-play-time"></div>
  </li>
  <li class="statistic__item">
    <h4 class="statistic__item-title">Maximum play time</h4>
    <div class="statistic__item-count" data-count="max-play-time"></div>
  </li>
      `;
  const statisticList = createElement('ul', 'statistic__list');
  statisticList.insertAdjacentHTML('beforeend', statisticItems);
  const statisticWrapper = createElement('div', 'statistic__wrapper', [statisticCloseButton, statisticTitle, statisticList]);

  const body = document.querySelector('body');
  statisticCloseButton.addEventListener('click', () => {
    body.removeChild(document.querySelector('.statistic__wrapper'));
  });

  return statisticWrapper;
}
