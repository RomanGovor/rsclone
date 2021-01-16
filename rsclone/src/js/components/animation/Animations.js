export class Animations {
  constructor() {
    this.setButtonsAnimations();
  }

  setButtonsAnimations() {
    const buttons = document.querySelectorAll('button');
    console.log(buttons);

    buttons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        console.log(1);
        const x = e.pageX;
        const y = e.pageY - 76;

        const ripples = document.createElement('span');
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;
        this.appendChild(ripples);

        setTimeout(() => {
          ripples.remove();
        }, 1000);
      });
    });
  }
}