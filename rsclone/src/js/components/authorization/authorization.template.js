import createElement from '../createElements/createElement';
import './authorization.scss';

export function authorizationForm() {
  const nameTooltip = 'From 2 to 20 characters.';
  const emailTooltip = 'Enter correct email.';
  const passwordTooltip = 'Lowercase and uppercase Latin letters, numbers. Minimum of 6 characters.';
  const formOverlay = createElement('div', 'authorization__form-overlay');
  const formTitle = createElement('h4', 'authorization__form-title');
  const formMessage = createElement('div', 'authorization__form-message');
  const formInputNickName = createElement(
    'input',
    'authorization__form-nickname',
    null,
    null,
    ['placeholder', 'Your Name'],
    ['type', 'text'],
    ['name', 'name'],
    ['tooltip', `${nameTooltip}`],
    ['data-validation', false],
  );
  const formInputEmail = createElement(
    'input',
    'authorization__form-email',
    null,
    null,
    ['placeholder', 'Your E-mail'],
    ['type', 'email'],
    ['name', 'email'],
    ['required', true],
    ['tooltip', `${emailTooltip}`],
    ['data-validation', false],
  );
  const formInputPassword = createElement(
    'input',
    'authorization__form-password',
    null,
    null,
    ['placeholder', 'Your Password'],
    ['type', 'password'],
    ['name', 'password'],
    ['required', true],
    ['minlength', 6],
    ['tooltip', `${passwordTooltip}`],
    ['data-validation', false],
  );
  const formButtonSubmit = createElement(
    'button',
    'authorization__form-buttonSubmit',
    null,
    null,
    ['type', 'submit'],
    ['disabled', 'disabled'],
  );
  const formLinkLogin = createElement(
    'a',
    'authorization__form-linkLogin authorization__form-link',
    null,
    null,
    ['href', '#'],
  );
  const formLinkLoginGuest = createElement(
    'a',
    'authorization__form-linkLoginGuest authorization__form-link',
    null,
    null,
    ['href', '#'],
  );
  const formLinkRegistration = createElement(
    'a',
    'authorization__form-linkRegistration authorization__form-link',
    null,
    null,
    ['href', '#'],
  );
  const formLinkWrapper = createElement(
    'div',
    'authorization__form-linkWrapper',
    [formLinkLogin, formLinkRegistration, formLinkLoginGuest],
  );
  formLinkLogin.innerHTML = 'sign in';
  formMessage.innerHTML = 'Authorization!';
  formLinkRegistration.innerHTML = 'sign up';
  formLinkLoginGuest.innerHTML = 'log in as a guest';
  formButtonSubmit.innerHTML = 'Submit';
  formTitle.innerHTML = 'Welcome!!!';
  const form = createElement('form', 'authorization__form login', [
    formTitle,
    formMessage,
    formInputNickName,
    formInputEmail,
    formInputPassword,
    formButtonSubmit,
    formLinkWrapper,
  ]);
  const formWrapper = createElement('div', 'authorization__form-wrapper', [
    formOverlay,
    form,
  ]);

  const inputStyle = (arr) => {
    arr.forEach((item) => {
      item.style.border = '1px solid black';
      if (item.dataset.validation === 'true') {
        item.dataset.validation = 'false';
      }
    });
    formButtonSubmit.setAttribute('disabled', 'disabled');
  };

  const toggleForm = (e) => {
    if (e.target.classList.contains('authorization__form-linkRegistration')) {
      inputStyle([formInputNickName, formInputEmail, formInputPassword]);
      formInputNickName.value = '';
      form.classList.remove('login');
      form.classList.remove('guest');
      formInputEmail.value = '';
      formInputPassword.value = '';
      formMessage.innerHTML = 'sign up';
      form.classList.add('registration');
    } else if (e.target.classList.contains('authorization__form-linkLogin')) {
      inputStyle([formInputEmail, formInputPassword]);
      formInputEmail.value = '';
      formInputPassword.value = '';
      form.classList.remove('registration');
      form.classList.remove('guest');
      formMessage.innerHTML = 'Authorization';
      form.classList.add('login');
    } else if (e.target.classList.contains('authorization__form-linkLoginGuest')) {
      inputStyle([formInputNickName]);
      formInputNickName.value = '';
      form.classList.remove('registration');
      form.classList.remove('login');
      formMessage.innerHTML = 'Enter your name';
      form.classList.add('guest');
    }
  };

  formWrapper.addEventListener('click', toggleForm);

  return formWrapper;
}
