// @param {String} el
// @param {String} className
// @param {HtmlElement} child
// @param {HtmlElement} parent
// @param {...array} attrEl

export default function createElement(el, className, child, parent, ...attrEl) {
  let element = null;
  try {
    if (el) {
      element = document.createElement(el);
    }
  } catch (err) {
    throw new Error('Error. Wrong value in function createElement');
  }

  if (className) {
    element.classList.add(...className.split(' '));
  }

  if (child && Array.isArray(child)) {
    child.forEach(
      (elementChild) => elementChild && element.appendChild(elementChild),
    );
  } else if (child && typeof child === 'object') {
    element.appendChild(child);
  } else if (child && typeof child === 'string') {
    element.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (attrEl.length) {
    attrEl.forEach(([attrKey, attrValue]) => {
      if (attrValue === '') {
        element.setAttribute(attrKey, '');
      }
      if (attrKey.match(/value|id|type|placeholder|disabled|autocomplete|minlength|required|name|href|cols|rows|src/)) {
        element.setAttribute(attrKey, attrValue);
      } else {
        element.dataset[attrKey] = attrValue;
      }
    });
  }

  return element;
}
