import { Extra } from '../js/core/services/Extra';
import '@testing-library/jest-dom';
describe('Extra', () => {
  const extra = new Extra();
  
  const mocList = document.createElement('div');
  document.body.append(mocList);

  beforeAll(()=> {
    mocList.innerHTML = `<span class='span1 none' language="en">hello</span><span class='span2' language="ru">привет</span>`;
  });

  test('should init Extra', () => {
    expect(typeof extra).toEqual('object');
    expect(extra instanceof Extra).toEqual(true);
  });

  test('translate - should translate language', () => {
    const span1 = mocList.querySelector('.span1');
    const span2 = mocList.querySelector('.span2');
    
    expect(span1.classList.contains('none')).toEqual(true);
    expect(span2.classList.contains('none')).toEqual(false);
    
    Extra.translate('en');
    expect(span1.classList.contains('none')).toEqual(false);
    expect(span2.classList.contains('none')).toEqual(true);
    Extra.translate('ru');
    expect(span1.classList.contains('none')).toEqual(true);
    expect(span2.classList.contains('none')).toEqual(false);
  });
  test('clearContainer - should clean the DOM element from children', () => {
    Extra.clearContainer(mocList);
    expect(mocList.innerHTML).toEqual('');
  });

  test('createSpan - should create span with attribute, value and textContent', () => {
    const newSpan = Extra.createSpan('en', 'Hello world');

    expect(newSpan).toBeDefined();
    expect(newSpan).toBeInstanceOf(HTMLSpanElement);
    expect(newSpan).toHaveAttribute('language', 'en');
    expect(newSpan).toHaveTextContent('Hello world');
  });
  test('createMultipleLanguageElement - should create DOM element with two spans inside differing textContent and attribute=[language]', () => {
    const newDiv = Extra.createMultipleLanguageElement('div', ['class1', 'class2'], 'hello', 'привет');

    expect(newDiv).toBeDefined();
    expect(newDiv).toBeInstanceOf(HTMLDivElement);
    expect(newDiv).toHaveClass('class1 class2');
    expect(newDiv).not.toBeEmptyDOMElement();
    expect(newDiv).toContainHTML('<span language="en">hello</span><span language="ru">привет</span>');
  });
  test('getRandomInt - should create random integer number less then the max value', () => {
    const max = 10;
    const num = Extra.getRandomInt(max);

    expect(typeof num).toEqual('number');
    expect(num % 1).toEqual(0);
    expect(num <= max).toEqual(true);
  });
  test('getRandomArray - should create array random number', () => {
    const len = 25;
    const count = 5;
    const randomArray = Extra.getRandomArray(len, count, [1,2,3,4,5]);

    expect(randomArray instanceof Array).toEqual(true);
    expect(randomArray.length).toEqual(5);
  });
});