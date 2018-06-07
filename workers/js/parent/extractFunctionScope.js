(function (window) {
  function extractScope(func) {
    let str = '' + func, index;

    if ((index = str.indexOf('{')) > -1) {
      str = str.substr(index + 1);
      str = str.trim();
      if (str.lastIndexOf('}') === (str.length - 1)) {
        str = str.substr(0, str.length - 1);
        str = str.trim();
      }
    }
    return str;
  }

  window.functions = {
    extractScope: extractScope
  };
})(window);