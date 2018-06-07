(function () {

  const fadeTime = 2000;

  const errorLogger = {
    div: null,
    counter: 0,
    timeout: null
  };

  bindToLoadState(() => {
    window.addEventListener("error", function (err) {
      showError(err);
    });
  });

  function showError(err) {
    if (!errorLogger.div) {
      errorLogger.div = document.createElement("DIV");
      errorLogger.div.className = "errorLog";
      document.body.appendChild(errorLogger.div);
    }
    errorLogger.counter = errorLogger.counter + 1;
    errorLogger.div.innerHTML = "Error Count: " + errorLogger.counter + " Message: " + err.message;
    errorLogger.div.style.display = "block";
    if (errorLogger.timeout) {
      clearTimeout(errorLogger.timeout)
    }
    errorLogger.timeout = setTimeout(hideErrorLog, fadeTime);
  }

  function hideErrorLog() {
    errorLogger.div.style.display = "none";
  }

})(window);