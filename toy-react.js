function createElement(type, attrs, ...children) {
  const el = isString(type) ? new FakeElement(type) : new type;
  setAttributes(el, attrs);
  insetChildren(el, children);
  return el;
}

function setAttributes(el, attrs) {
  if(!attrs) return;
  for(const name in attrs) {
    el.setAttribute(name, attrs[name])
  }
}

function insetChildren(el, children) {
  for(const child of children) {
    if( Array.isArray(child) ) {
      insetChildren(el, child);
    } else {
      el.appendChild( isString(child) ? new FakeTextNode(child) : child );
    }
  }
}

function isString(value) {
  return typeof value == 'string';
}

class FakeElement {
  constructor(type) {
    this.$el = document.createElement(type)
  }
  setAttribute(name, value) {
    this.$el.setAttribute(name, value)
  }
  appendChild(component) {
    this.$el.appendChild(component.$el)
  }
}

class FakeTextNode {
  constructor(content) {
    this.$el = document.createTextNode(content);
  }
}

class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._el = null
  }
  get $el() {
    return this._el || (this._el = this.render().$el)
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
}

function render(component, $container) {
  $container.appendChild(component.$el);
}

export {
  createElement,
  Component,
  render,
}