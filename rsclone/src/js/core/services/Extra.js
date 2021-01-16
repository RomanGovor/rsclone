export class Extra {
  static translate(lang) {
    const enStings = document.querySelectorAll('[language="en"]');
    const ruStings = document.querySelectorAll('[language="ru"]');

    enStings.forEach((el) => {
      if (lang === 'en') el.classList.remove('none');
      else el.classList.add('none');
    });
    ruStings.forEach((el) => {
      if (lang === 'ru') el.classList.remove('none');
      else el.classList.add('none');
    });
  }

  static clearContainer(container) {
    while (container.childElementCount !== 0) {
      container.removeChild(container.firstChild);
    }
  }

  static delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static hidePages(active) {
    const container = document.querySelector('.wrapper .container');
    for (let i = 0; i < container.childElementCount; i++) {
      const el = container.children[i];
      if (active === el) el.classList.remove('none');
      else el.classList.add('none');
    }
  }
}
