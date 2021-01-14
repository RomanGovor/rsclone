class Playground {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__playground');
    this.lang = options.lang || 'en';
    this.allCategoriesEn = options.allCategoriesEn || [];
    this.allCategoriesRu = options.allCategoriesRu || [];
    // this.response();
    // console.log(' this.allCategoriesEn ', this.allCategoriesEn);
    this.render();
    this.showCategories(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
  }

  async render() {
    await (() => {
      this.playground = document.createElement('div');
      this.playground.classList = 'playground';
      this.container.append(this.playground);

      this.createTable(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
      this.createButton();
    })();
  }

  // async response() {
  //   const response = await fetch('../assets/quiz.json');
  //   this.allCategoriesEn = [];
  //   this.allCategoriesRu = [];
  //   // console.log(response.ok);
  //   if (response.ok) {
  //     // const data = await response.json();
  //     (await response.json()).rounds.forEach((el) => {
  //       // console.log(el);
  //       el.categories.forEach((cat) => {
  //         // console.log(cat);
  //         this.allCategoriesEn.push(cat.categoryInfo.categoryNameEn);
  //         this.allCategoriesRu.push(cat.categoryInfo.categoryNameRu);
  //       });
  //     });
  //   } else throw new Error(`Error ${response.status}`);
  //   // TODO вывод категорий
  //   // console.log('data ', data.rounds);
  //   console.dir(this.allCategoriesEn);
  //   console.dir(this.allCategoriesRu);
  // }

  createTable(arr) {
    this.table = document.createElement('table');
    this.table.classList = 'playground__table';
    let i = 0;
    // eslint-disable-next-line operator-linebreak
    const str =
      "<td class='cell cell-1'>100</td><td class='cell cell-2'>200</td><td class='cell cell-3'>300</td><td class='cell cell-4'>400</td><td class='cell cell-5'>500</td>";
    this.table.innerHTML = `
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    `;
    this.playground.append(this.table);

    this.bindTableEvent();
  }

  bindTableEvent() {
    this.table.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        e.target.classList.add('blink');
        setTimeout(() => {
          e.target.classList.remove('blink');
          e.target.textContent = '';
        }, 2500);
      }
    });
  }

  showCategories(arr = this.allCategoriesEn, delay = 5) {
    if (this.answerButton && this.table) {
      this.hideTable();
      this.hideButton();
    }

    this.categoriesList = document.createElement('ul');
    this.categoriesList.classList = 'playground__categories-list';
    arr.forEach((el) => {
      const item = document.createElement('li');
      item.classList = 'playground__categories-item';
      item.textContent = el;
      this.categoriesList.append(item);
    });
    this.playground.append(this.categoriesList);

    setTimeout(() => {
      this.categoriesList.classList.add('playground__categories-list_animated');
    }, 0);
    setTimeout(() => {
      this.categoriesList.classList.add('none');
      this.showTable();
      this.showButton();
    }, delay * 1000);
  }

  hideCategories() {
    this.categoriesList.classList.add('none');
  }

  hideTable() {
    this.table.classList.add('none');
  }

  showTable() {
    this.table.classList.remove('none');
  }

  createButton() {
    this.answerButton = document.createElement('button');
    this.answerButton.textContent = 'Кнопочка';
    this.answerButton.classList.add('controls__answer-button');
    this.container.append(this.answerButton);
  }

  hideButton() {
    this.answerButton.classList.add('none');
  }

  showButton() {
    this.answerButton.classList.remove('none');
  }

  clear() {
    this.playground.innerHTML = '';
  }
}

export default Playground;
