(function (window) {
  function rand() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  window.generateId = () => {
    return (rand() + rand() + "-" + rand() + "-4" + rand().substr(0, 3) + "-" + rand() + "-" + rand() + rand() + rand()).toLowerCase();
  };
})(window);


