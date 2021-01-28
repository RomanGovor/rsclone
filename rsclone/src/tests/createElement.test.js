import createElement from '../js/components/createElements/createElement';
import '@testing-library/jest-dom';

describe('createElement', () => {
  test('should create DOM element by tagName with className, child, attributes, then put in parent.', () => {
    const parent = document.createElement('div');
    parent.classList.add('container');
    
    const child = document.createElement('span');
    child.classList.add('child');

    const element = createElement('div', 'element', child, parent, ['type', 'password'], ['minlength', 6])

    expect(element).toBeDefined();
    expect(element).toHaveClass('element');
    expect(element).toBeInstanceOf(HTMLDivElement);
    expect(element).not.toBeEmptyDOMElement();
    expect(element).toHaveAttribute('type', 'password');
    expect(element).toHaveAttribute('minlength', '6');
    expect(element).toContainElement(child);

    expect(parent).toContainElement(element);
  });
});