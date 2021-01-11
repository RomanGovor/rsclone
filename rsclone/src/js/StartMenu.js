class StartMenu {
  constructor(options) {
    this.container = options.container || document.querySelector('main > .container');
    this.lang = options.lang || 'en';
    this.init();
    this.bindEvents();
  }

  init() {
    this.menu = document.createElement('div');
    this.menu.classList = 'start-menu none';
    this.renderByLang(this.lang);
    this.container.prepend(this.menu);
  }

  renderByLang(land = 'ru') {
    this.menu.innerHTML = '';

    if (land === 'ru') {
      this.menu.innerHTML = `<ul class='start-menu__list'>
      <li class='start-menu__item' id='single-game'>Одиночная игра</li>
      <li class='start-menu__item' id='online-game'>Онлайн игра</li>
      <li class='start-menu__item' id='lan-game'>Игра по сети</li>
      <li class='start-menu__item' id='best-players'>Лучшие игроки</li>
      <li class='start-menu__item' id='about'>Об игре</li>
      <li class='start-menu__item' id='exit'>Выход</li>
      </ul>`;
    } else if (land === 'en') {
      this.menu.innerHTML = `<ul class='start-menu__list'>
        <li class='start-menu__item' id='single-game'>Single player game</li>
        <li class='start-menu__item' id='online-game'>Online game</li>
        <li class='start-menu__item' id='lan-game'>LAN play</li>
        <li class='start-menu__item' id='best-players'>Best players</li>
        <li class='start-menu__item' id='about'>About the game</li>
        <li class='start-menu__item' id='exit'>Exit</li>
      </ul>`;
    }
  }

  bindEvents() {
    this.menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('start-menu__item')) {
        // обработчики здесь
        console.log(e.target.textContent);
      }
    });
  }

  hide() {
    this.menu.classList.add('none');
  }

  show() {
    this.menu.classList.remove('none');
  }

  isOpen() {
    return !this.menu.classList.contains('none');
  }
}
export default StartMenu;
