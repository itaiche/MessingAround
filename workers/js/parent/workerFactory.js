(function (window) {
  let factory = {};

  function create(options) {
    let id = generateId();
    let urlPath, workerScope;

    if (!options.path && options.func) {
      urlPath = makeFunctionURLBlob(options.func);
    } else {
      urlPath = options.path;
    }
    if (urlPath) {
      workerScope = createWorker(urlPath, id, options);
      factory[id] = {worker: workerScope, incoming: [], results: []};
    }
    return workerScope;
  }

  function createWorker(path, id, options) {
    let worker = new Worker(path);

    worker.addEventListener('message', (message) => {
      factory[id].results.push(message);
      if (options.handler) {
        runner(options.handler, options.context, message.data, message);
      }
    });

    worker.getState = () => {
      return {results: factory[id].results, incoming: factory[id].incoming};
    };

    worker.sendMessage = (message) => {
      factory[id].incoming.push(message);
      worker.postMessage(message);
    };

    worker.init = () => {
      worker.postMessage({});
      worker.init = () => {
      };
    };

    worker.kill = () => {
      delete factory[id];
      worker.send('close');
    };


    if (options.autoStart) {
      worker.init();
    } else

      return {
        id,
        getAllMessages: getAllMessages.bind(id),
        sendMessage: worker.sendMessage,
        state: worker.getState,
        init: worker.init,
        kill: worker.kill
      };
  }

  function getAllMessages(id) {
    return factory[id] && factory[id].incoming;
  }

  function makeFunctionURLBlob(func) {
    if (typeof func === 'function' &&
      (window.URL || window.webkitURL)) {
      return (window.URL || window.webkitURL).createObjectURL(new Blob([functions.extractScope(func)]));
    } else {
      return false;
    }
  }

  function purge() {
    for (let key in factory) {
      factory[key].kill();
      factory[key] = null;
      delete factory[key];
    }
  }

  window.workerFactory = {
    create,
    purge
  };

})(window);