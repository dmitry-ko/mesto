export default class Section {
  constructor({ items, renderer }, selector) {
    this._initialItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems = () => {
    this._initialItems.forEach(item => {
      this._container.append(this._renderer(item));
    });
  };

  addItem = element => {
    this._container.prepend(element);
  };
}
