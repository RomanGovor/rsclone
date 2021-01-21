import { statisticPage } from './statistic.template';
import { Request } from '../../core/index';
import { Storage } from '../../core/services/Storage';

export class Statistic {
  constructor() {
    this.request = new Request();
  }

  getUserData() {
    if (Storage.getAuthorizationStatus() === 'true') {
      this.request.getClientData();
      Storage.getUserStatisticData();
    } else {
      Storage.getUserStatisticData();
    }
  }

  setUserData(data) {
    if (Storage.getAuthorizationStatus() === 'true') {
      this.request.putClientData(data);
    } else {
      Storage.setUserStatisticData(data);
    }
  }

  init() {
    const page = statisticPage();
    const body = document.querySelector('body');
    body.append(page);
  }
}
