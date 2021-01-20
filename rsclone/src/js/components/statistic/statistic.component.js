import { statisticPage } from './statistic.template';
import { Request } from '../../core/index';

export class Statistic {
  constructor() {
    this.request = new Request();
  }

  getUserData() {
    this.request.getClientData();
  }

  setUserData(data) {
    this.request.putClientData(data);
  }

  init() {
    const page = statisticPage();
    const body = document.querySelector('body');
    body.append(page);
    this.request.getClientData();
  }
}
