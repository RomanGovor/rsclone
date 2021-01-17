import {
  PathSignIn, PathSignUp, PathGetAndPutRequest, PathLogout, PathLogoutAll,
} from '../Constants';

export class Request {
  constructor() {
    this.requestToken = this.getTokenFromStorage();
  }

  // Зарегистрироваться POST
  signUp(data, message, finish) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(PathSignUp, requestOptions)
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
          }, 2000);
        }
        return response.json();
      }).then((result) => this.setUserDataInStorage(result))
      .catch(() => { message.innerHTML = 'Enter the correct email'; });
  }

  // Войти POST
  signIn(data, message, finish) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(PathSignIn, requestOptions)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          message.innerHTML = 'Fill in the fields correctly.Try again';
          setTimeout(() => {
            message.innerHTML = 'Authorization';
          }, 2000);
        } else {
          message.innerHTML = 'Authorization was successful';
          setTimeout(() => {
            console.log(PathLogout);
            finish();
          }, 2000);
        }
        return response.json();
      }).then((result) => this.setUserDataInStorage(result))
      .catch(() => { message.innerHTML = 'Enter the correct data'; });
  }

  logout() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(PathLogout, requestOptions)
      .then((response) => response.json())
      .then(() => localStorage.setItem('isAuthorization', 'false'))
      .catch((err) => { console.log(err); });
  }

  logoutAll() {
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
      .catch((err) => console.log(err));
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
      .then((result) => this.setUserDataInStorage(result))
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

  setUserDataInStorage(result) {
    localStorage.setItem('token', `${result.token}`);
    localStorage.setItem('name', `${result.user.name}`);
    localStorage.setItem('statistic', `${JSON.stringify(result.result.user.data)}`);
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
