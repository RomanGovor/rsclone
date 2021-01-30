import {
  Constants,
} from '../Constants';
import { removeUserAuthorizationData } from './userAuthorizationData';
import { Storage } from './Storage';

export class Request {
  // Зарегистрироваться POST
  async signUp(data, message, finish) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    await fetch(Constants.PathSignUp, requestOptions)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          message.innerHTML = 'Fill in the fields correctly.Try again';
          setTimeout(() => {
            message.innerHTML = 'Sign in';
          }, 2000);
        } else {
          message.innerHTML = 'Registration was successful';
          setTimeout(() => {
            finish();
          }, 1000);
        }
        return response.json();
      }).then((result) => this.setUserDataInStorage(result))
      .catch((err) => console.err(err));
  }

  // Войти POST
  async signIn(data, message, finish) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    await fetch(Constants.PathSignIn, requestOptions)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          message.innerHTML = 'Fill in the fields correctly.Try again';
          setTimeout(() => {
            message.innerHTML = 'Authorization';
          }, 2000);
        } else {
          message.innerHTML = 'Authorization was successful';
          setTimeout(() => {
            finish();
          }, 1000);
        }
        return response.json();
      }).then((result) => this.setUserDataInStorage(result))
      .catch((err) => { console.err(err); });
  }

  async logout() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getUserToken()}`,
      },
    };
    await fetch(Constants.PathLogout, requestOptions)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(`Wrong status: ${response.status}`);
        } else if (response.status === 200) {
          localStorage.clear();
          Storage.setAuthorizationStatus('false');
          Storage.setUserStatisticData(Constants.EmptyUserData);
          removeUserAuthorizationData();
        }
      })
      .catch((err) => console.err(err));
  }

  // Получить данные клиента GET
  async getClientData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getUserToken()}`,
      },
    };
    await fetch(Constants.PathGetAndPutRequest, requestOptions)
      .then((response) => response.json())
      .then((result) => Storage.setUserStatisticData(result.data))
      .catch((err) => console.err(err));
  }

  // Получить данные статистики PUT
  async putClientData(data) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getUserToken()}`,
      },
      body: JSON.stringify(data),
    };
    await fetch(Constants.PathGetAndPutRequest, requestOptions)
      .then((response) => response.json())
      .catch((err) => console.err(err));
  }

  setUserDataInStorage(result) {
    Storage.setUserToken(result.token);
    Storage.setUserName(result.user.name);
    Storage.setUserStatisticData(result.user.data);
  }

  setTokenInStorage(token) {
    Storage.setUserToken(token);
  }
}
