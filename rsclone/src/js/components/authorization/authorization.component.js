/* eslint-disable prefer-destructuring */
import { authorizationForm } from './authorization.template';
import { Request } from '../../core/services/request';

export class Authorization {
  constructor() {
    this.authorizationForm = new authorizationForm();
    this.formMessage = this.authorizationForm[2];
    this.form = this.authorizationForm.childNodes[1];
    this.nick = this.authorizationForm.childNodes[1][0];
    this.email = this.authorizationForm.childNodes[1][1];
    this.password = this.authorizationForm.childNodes[1][2];
    this.submitButton = this.authorizationForm.childNodes[1][3];
    this.request = new Request();
    this.userData = {};
  }

  init() {
    const body = document.querySelector('body');
    body.append(this.authorizationForm);
    this.changeForm();
    this.sendForm();
  }

  changeForm() {
    this.form.addEventListener('input', () => {
      if (this.form.classList.contains('login')) {
        this.userData = {
          [this.email.name]: this.email.value,
          [this.password.name]: this.password.value,
        };
      } else if (!this.form.classList.contains('registration')) {
        this.userData = {
          [this.nick.name]: this.nick.value,
          [this.email.name]: this.email.value,
          [this.password.name]: this.password.value,
        };
      }
    });
  }

  removeForm() {
    const body = document.querySelector('body');
    body.removeChild(this.authorizationForm);
  }

  errorRegistration() {
    console.log('errorRegistration');
  }

  errorAuthorization() {
    console.log('errorAuthorization');
  }

  sendForm() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.form.classList.contains('login')) {
        this.request.signIn(this.userData, this.errorAuthorization);
      } else if (this.form.classList.contains('registration')) {
        this.request.signUp(this.userData, this.errorRegistration);
      } else if (this.form.classList.contains('guest')) {
        localStorage.setItem('name', `${this.nick.value}`);
        console.log(localStorage.getItem('name'));
        this.removeForm();
      }
    });
  }
}
