import { statisticPage } from './statistic.template';
import { Request } from '../../core/index';
import { Storage } from '../../core/services/Storage';

export class Statistic {
  constructor() {
    this.request = new Request();
  }

  changeUserData(points, time, win = true) {
    const data = this.getUserData();
    const averagePlayTime = (data.averagePlayTime === '0') ? time : Math.round((+data.averagePlayTime + time) / 2);
    const pointsTotal = +data.points === '0' ? points : +data.points + points;
    const newData = {
      numberOfGames: `${+data.numberOfGames + 1}`,
      maximumNumberOfWins: `${win ? +data.maximumNumberOfWins + 1 : +data.maximumNumberOfWins}`,
      points: `${pointsTotal}`,
      averagePoints: `${Math.round(pointsTotal / (+data.numberOfGames + 1))}`,
      averagePlayTime: `${averagePlayTime}`,
      maximumPlayTime: `${time > +data.maximumPlayTime ? time : +data.maximumPlayTime}`,
    };
    return newData;
  }

  getUserData() {
    if (Storage.getAuthorizationStatus() === 'true') {
      this.request.getClientData();
      return Storage.getUserStatisticData();
    }
    return Storage.getUserStatisticData();
  }

  setUserData(data) {
    if (Storage.getAuthorizationStatus() === 'true') {
      this.request.putClientData(data);
    } else {
      Storage.setUserStatisticData(data);
    }
  }

  init(activePage) {
    statisticPage(activePage);
  }

  addZero(num) {
    return num >= 10 ? `${num}` : `0${num}`;
  }

  setStatisticTime(time) {
    const seconds = this.addZero(time % 60);
    const minutes = this.addZero(((time - seconds) / 60) % 60);
    const hours = this.addZero((time - seconds - minutes * 60) % 3600);

    return `${hours}:${minutes}:${seconds}`;
  }
}
