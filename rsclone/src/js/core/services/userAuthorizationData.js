export function setUserAuthorizationData() {
  const linkLogout = document.querySelector('.header__userAuthotization');
  const userName = document.querySelector('.header__userName');
  linkLogout.innerHTML = 'Log out';
  userName.innerHTML = localStorage.getItem('name');
}

export function removeUserAuthorizationData() {
  const linkLogout = document.querySelector('.header__userAuthotization');
  const userName = document.querySelector('.header__userName');
  linkLogout.innerHTML = 'Log in';
  userName.innerHTML = 'Anonymous';
}
