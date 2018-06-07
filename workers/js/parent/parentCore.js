(function (window) {

  const DEFAULT_HANDLERS = {
    LOG: 'LOG'
  };

  let handlers = {};

  registerMessageHandler(DEFAULT_HANDLERS.LOG, logHandler);

  function parseMessage(messageString) {
    let message;
    if (typeof messageString === 'string' && messageString.indexOf('{') === 0) {
      try {
        message = JSON.parse(messageString);
      } catch (e) {
        message = defaultMessage(messageString);
      }
    } else {
      message = defaultMessage(messageString);
    }
    return message;
  }

  function defaultMessage(stringData) {
    return {
      command: DEFAULT_HANDLERS.LOG,
      data: stringData
    };
  }

  function messageRouter(messageData, message) {
    const {command, data} = parseMessage(messageData);
    if (handlers[command]) {
      runner(handlers[command], handlers[command], data, message);
    } else {
      console.warn('no handler registered for ' + command + ' from ' + message.origin);
    }
  }

  function logHandler(data, message) {
    if (console) {
      console.log(data, message.origin);
    }
  }

  function registerMessageHandler(commandName, handler) {
    handlers[commandName] = handler;
  }

  function unregisterMessageHandler(commandName) {
    delete handlers[commandName];
  }

  window.messagesAPI = {
    messageRouter,
    registerMessageHandler,
    unregisterMessageHandler
  };
})(window);