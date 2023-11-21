import autobind from "autobind-decorator";
import EventEmitter from "./EventEmitter";

export class SongList extends EventEmitter {
  constructor() {
    super();
    this._list = [];
    this._element = document.createElement("div");
    this._element.classList.add("song-list");
    this._element.addEventListener("click", (e) => this._clickHandler(e));
  }

  set list(v) {
    this._list = v.slice();
    this._update();
  }

  _clickHandler(e) {
    let t = e.target;
    while (t && t.dataset["index"] === undefined) {
      t = t.parentElement;
    }
    if (!t) {
      return;
    }

    const index = parseInt(t.dataset["index"], 10);
    if (Number.isNaN(index) || index < 0 || index >= this._list.length) {
      return;
    }

    const item = this._list[index];
    this.emit("click", item);
  }

  render() {
    return this._element;
  }

  _update() {
    this._element.innerHTML = "";
    this._list
      .map((item, index) => {
        const el = document.createElement("div");
        el.dataset.index = index.toString();
        el.innerHTML = `<h2>${item.title} - ${item.singer}<small>(${item.author})</small></h2>`;
        return el;
      })
      .forEach((el) => this._element.appendChild(el));
  }
}
