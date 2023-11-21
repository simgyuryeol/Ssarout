class EventEmitter {
  constructor() {
      this._handlers = new Map();
  }

  on(eventKey, handler, once = false) {
      if (!this._handlers.has(eventKey)) {
          this._handlers.set(eventKey, []);
      }

      this._handlers.get(eventKey).push({ handler, once });
  }

  emit(eventKey, ...args) {
      if (!this._handlers.has(eventKey)) return;

      const handlers = this._handlers.get(eventKey);

      handlers.forEach(info => {
          info.handler(...args);
      });

      for (let i = handlers.length - 1; i >= 0; i--) {
          if (handlers[i].once) {
              handlers.splice(i, 1);
          }
      }
  }
}

export default EventEmitter