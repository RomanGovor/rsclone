import { statisticPage } from './statistic.template';

export class Statistic {
  init() {
    const page = statisticPage();
    const body = document.querySelector('body');
    body.append(page);
  }
}
