function workerCore() {

  addEventListener('message', messageHandler);

  function messageHandler(message) {
    const request = parseMessage(message.data);
    switch (request.command) {
      default:
      case 'ECHO':
        echo(request.data);
        break;
      case 'script':
        loadScrips(request.data);
        break;
    }
  }

  function echo(data) {
    postMessage(data);
  }

  function loadScrips(data) {
    if (data && data.url) {
      importScripts(data.url);
      postMessage({ command : 'scriptLoaded', url: data.url});
    }
  }

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

  function defaultMessage(dataString) {
    return {
      command: 'ECHO',
      data: dataString
    };
  }
}