class App {
  constructor() {
    this.language = 'en';
    this.setEvents();
  }

  setEvents() {
    const switchGameModeBtn = document.querySelector('.switch__checkbox');
    switchGameModeBtn.addEventListener('change', () => {
      const switchEn = document.querySelector('.switch__en');
      const switchRu = document.querySelector('.switch__ru');
      switchRu.classList.toggle('none');
      switchEn.classList.toggle('none');

      this.translateStrings();
    });
  }

  translateStrings() {
    const enStings = document.querySelectorAll('[language="en"]');
    const ruStings = document.querySelectorAll('[language="ru"]');
    enStings.forEach((el) => {
      el.classList.toggle('none');
    });
    ruStings.forEach((el) => {
      el.classList.toggle('none');
    });
  }
}

const APP = new App();
