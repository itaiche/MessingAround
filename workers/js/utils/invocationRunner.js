(function (window) {

  window.runner = (func, context, ...args) => {
    try {
      if (typeof func === 'function') {
        func.call(context, ...args);
      }
    } catch (exc) {
      console.error(exc);
    }
  }
})(window);