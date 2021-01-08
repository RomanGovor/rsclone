import createElement from '../createElements/createElement';
import './authorization.scss';

export function authorizationForm() {
  const formOverlay = createElement('div', 'authorization__form-overlay');
  const formTitle = createElement('h4', 'authorization__form-title');
  const formMessage = createElement('div', 'authorization__form-massage');
  const formInputNickName = createElement(
    'input',
    'authorization__form-nickname',
    null,
    null,
    ['placeholder', 'Your Name'],
    ['type', 'text'],
    ['name', 'name'],
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
  );
  const formButtonSubmit = createElement(
    'button',
    'authorization__form-buttonSubmit',
    null,
    null,
    ['type', 'submit'],
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

  const toggleForm = (e) => {
    if (e.target.classList.contains('authorization__form-linkRegistration')) {
      form.classList.remove('login');
      form.classList.remove('guest');
      formMessage.innerHTML = 'sign up';
      form.classList.add('registration');
    } else if (e.target.classList.contains('authorization__form-linkLogin')) {
      form.classList.remove('registration');
      form.classList.remove('guest');
      formMessage.innerHTML = 'Authorization';
      form.classList.add('login');
    } else if (e.target.classList.contains('authorization__form-linkLoginGuest')) {
      form.classList.remove('registration');
      form.classList.remove('login');
      formMessage.innerHTML = 'Enter your name';
      form.classList.add('guest');
    }
  };

  formWrapper.addEventListener('click', toggleForm);

  return formWrapper;
}
