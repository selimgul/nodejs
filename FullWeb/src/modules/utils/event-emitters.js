const events = require('events');

const eventEmitter = new events.EventEmitter();

module.exports = () => {
  function subscribe(eventName, eventHandler) {
    eventEmitter.on(eventName, eventHandler);
  };

  function fire(eventName, ...args) {
    eventEmitter.emit(eventName, args);
  }

  return {
    subscribe,
    fire
  }
}