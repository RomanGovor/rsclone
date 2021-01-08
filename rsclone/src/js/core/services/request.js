import {
  PathSignIn, PathSignUp, PathGetAndPutRequest, PathLogout, PathLogoutAll,
} from '../Constants';

export class Request {
  constructor() {
    this.requestToken = this.getTokenFromStorage();
  }

  // Зарегистрироваться POST
  signUp(data, callbackError) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(PathSignUp, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch(callbackError());
  }

  // Войти POST
  signIn(data, callbackError) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(PathSignIn, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch(callbackError());
  }

  logout(callbackError) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.requestToken}`,
      },
    };
    fetch(PathLogout, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch(callbackError());
  }

  logoutAll(callbackError) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.requestToken}`,
      },
    };
    fetch(PathLogoutAll, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch(callbackError());
  }

  // Получить данные клиента GET
  getClientData(callbackError) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.requestToken}`,
      },
    };
    fetch(PathGetAndPutRequest, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch(callbackError());
  }

  // Получить данные статистики PUT
  putClientData(data, callbackError) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.requestToken}`,
      },
      body: JSON.stringify(data),
    };
    fetch(PathGetAndPutRequest, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch(callbackError());
  }

  setTokenInStorage(token) {
    localStorage.setItem('token', token);
  }

  getTokenFromStorage() {
    const token = localStorage.getItem('token');
    if (token === null) {
      throw new Error();
    } else {
      return token;
    }
  }
}
