/* eslint-disable prefer-destructuring */
import { authorizationForm } from './authorization.template';
import { Request } from '../../core/services/request';
import { setUserAuthorizationData } from '../../core/index';

export class Authorization {
  constructor() {
    this.authorizationForm = authorizationForm();
    this.form = this.authorizationForm.childNodes[1];
    this.message = this.form.childNodes[1];
    this.nick = this.form.childNodes[2];
    this.email = this.form.childNodes[3];
    this.password = this.form.childNodes[4];
    this.submitButton = this.form.childNodes[5];
    this.request = new Request();
    this.userData = {};
  }

  init() {
    const body = document.querySelector('body');
    body.append(this.authorizationForm);
    this.inputTooltip();
    this.changeForm();
    this.email.innerHTML = '';
    this.sendForm();
  }

  inputTooltip() {
    let tooltipElem;
    document.onmouseover = (event) => {
      const target = event.target;
      const tooltipHtml = target.dataset.tooltip;
      if (!tooltipHtml) return;
      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);
      const coords = target.getBoundingClientRect();
      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;
      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
      }
      tooltipElem.style.left = `${left}px`;
      tooltipElem.style.top = `${top}px`;
    };
    document.onmouseout = () => {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    };
  }

  validationBlock(elem, exp) {
    if (elem.value.match(exp) && elem.value.length > 1) {
      elem.style.border = '1px solid green';
      elem.dataset.validation = 'true';
    } else {
      elem.style.border = '1px solid red';
      elem.dataset.validation = 'false';
    }
  }

  formValidationPassword() {
    const exp = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    this.validationBlock(this.password, exp);
  }

  formValidationEmail() {
    const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validationBlock(this.email, exp);
  }

  formValidationName() {
    // eslint-disable-next-line no-useless-escape
    if (this.nick.value.length > 1 && this.nick.value.length < 21) {
      this.nick.style.border = '1px solid green';
      this.nick.dataset.validation = 'true';
    } else {
      this.nick.style.border = '1px solid red';
      this.nick.dataset.validation = 'false';
    }
  }

  formValidationSubmit(arr) {
    arr.every((item) => item.dataset.validation === 'true');
  }

  formValidation(e, arr) {
    if (e.target.classList.contains('authorization__form-nickname')) {
      this.formValidationName();
    } else if (e.target.classList.contains('authorization__form-email')) {
      this.formValidationEmail();
    } else if (e.target.classList.contains('authorization__form-password')) {
      this.formValidationPassword();
    }

    if (arr.every((item) => item.dataset.validation === 'true')) {
      this.submitButton.removeAttribute('disabled');
    }
  }

  changeForm() {
    this.form.addEventListener('input', (e) => {
      this.formValidation(e, [this.email, this.password]);
      if (this.form.classList.contains('login')) {
        this.userData = {
          [this.email.name]: this.email.value,
          [this.password.name]: this.password.value,
        };
      } else if (this.form.classList.contains('registration')) {
        this.formValidation(e, [this.nick, this.email, this.password]);
        this.userData = {
          [this.nick.name]: this.nick.value,
          [this.email.name]: this.email.value,
          [this.password.name]: this.password.value,
        };
      } else if (this.form.classList.contains('guest')) {
        this.formValidation(e, [this.nick]);
      }
    });
  }

  removeForm() {
    const body = document.querySelector('body');
    body.removeChild(this.authorizationForm);
  }

  finish() {
    localStorage.setItem('isAuthorization', true);
    setUserAuthorizationData();
    this.removeForm();
  }

  sendForm() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.form.classList.contains('login')) {
        this.request.signIn(this.userData, this.message, () => this.finish());
      } else if (this.form.classList.contains('registration')) {
        this.request.signUp(this.userData, this.message, () => this.finish());
      } else if (this.form.classList.contains('guest')) {
        if (this.nick.value === '') {
          this.message.innerHTML = 'Error.Empty name';
          return;
        }
        localStorage.setItem('name', `${this.nick.value}`);
        this.removeForm();
      }
    });
  }
}
