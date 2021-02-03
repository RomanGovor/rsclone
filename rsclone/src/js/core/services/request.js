import {
  Constants,
} from '../Constants';
import { removeUserAuthorizationData } from './userAuthorizationData';
import { Storage } from './Storage';

export class Request {
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
        if (response.status >= 400 && response.status < 500) {
          message.innerHTML = 'Fill in the fields correctly.Try again';
          setTimeout(() => { message.innerHTML = 'Sing Up'; }, 2000);
        } else if (response.status >= 500 && response.status < 600) {
          this.errorMessage('Sorry, the server is temporarily unresponsive. Try later');
        } else if (response.status >= 200 && response.status < 300) {
          this.errorMessage('Registration was successful');
          setTimeout(() => {
            finish();
          }, 1000);
        }
        return response.json();
      }).then((result) => this.setUserDataInStorage(result))
      .catch((err) => console.log(err));
  }

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
        if (response.status >= 400 && response.status < 500) {
          setTimeout(() => { message.innerHTML = 'Sing In'; }, 2000);
          message.innerHTML = 'Fill in the fields correctly.Try again';
        } else if (response.status >= 500 && response.status < 600) {
          this.errorMessage('Sorry, the server is temporarily unresponsive. Try later');
        } else if (response.status >= 200 && response.status < 300) {
          this.errorMessage('Authorization was successful');
          setTimeout(() => {
            finish();
          }, 1000);
        }
        return response.json();
      }).then((result) => {
        this.setUserDataInStorage(result);
      })
      .catch((err) => { console.log(err); });
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
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`Wrong status: ${response.status}`);
        } else if (response.status >= 500 && response.status < 600) {
          this.errorMessage('Sorry, the server is temporarily unresponsive. Try later');
        } else if (response.status >= 200 && response.status < 300) {
          localStorage.clear();
          Storage.setAuthorizationStatus('false');
          Storage.setUserStatisticData(Constants.EmptyUserData);
          Storage.setUserName('Anonymous');
          removeUserAuthorizationData();
        }
      })
      .catch((err) => console.log(err));
  }

  async getClientData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getUserToken()}`,
      },
    };
    await fetch(Constants.PathGetAndPutRequest, requestOptions)
      .then((response) => {
        if (response.status >= 500 && response.status < 600) {
          this.errorMessage('Sorry, the server is temporarily unresponsive. Try later');
        }
        return response.json();
      })
      .then((result) => Storage.setUserStatisticData(result.data))
      .catch((err) => console.log(err));
  }

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
      .then((response) => {
        if (response.status >= 500 && response.status < 600) {
          this.errorMessage('Sorry, the server is temporarily unresponsive. Try later');
        }
        return response.json();
      })
      .catch((err) => console.log(err));
  }

  setUserDataInStorage(result) {
    Storage.setUserToken(result.token);
    Storage.setUserName(result.user.name);
    Storage.setUserStatisticData(result.user.data);
  }

  setTokenInStorage(token) {
    Storage.setUserToken(token);
  }

  errorMessage(message) {
    const messageBlock = document.createElement('div');
    messageBlock.classList.add('error-message');
    messageBlock.innerHTML = message;
    document.querySelector('body').append(messageBlock);
    setTimeout(() => {
      document.querySelector('body').removeChild(messageBlock);
    }, 2000);
  }
}
