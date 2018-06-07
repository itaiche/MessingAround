function bindToLoadState(func) {
  if (document.readyState === "complete") {
    func();
  } else {
    window.addEventListener("load", func);
  }
}

function addControlButton(callback, buttonText) {
  const controlsContainer = document.getElementsByTagName("DIV")[0];
  const button = document.createElement("button");
  button.innerHTML = buttonText;
  button.addEventListener("click", callback);
  controlsContainer.appendChild(button);
}

function lazyLoadLink(text, script) {
  const link = document.createElement("a");
  link.innerText = text;
  link.setAttribute("href", "javascript:void 0");
  link.addEventListener("click", function () {
    loadScript(script)
    this.parentNode.removeChild(this);
  });
  document.getElementsByTagName("div")[0].appendChild(link);
}

function loadCSS(link){
  const css = document.createElement("LINK");
  css.rel = "stylesheet";
  css.href = link;
  css.type = "text/css";
  document.head.appendChild(css);
}

function loadScript(url) {
  const scr = document.createElement("script");
  scr.src = url;
  document.head.appendChild(scr);
}

bindToLoadState(function () {
  lazyLoadLink("Load Divver", "js/divver.js");
  lazyLoadLink("Load Animator", "js/animator.js");
  lazyLoadLink("Load Incomplete", "js/incomplete.js");
  lazyLoadLink("Load Errors", "js/exceptionThrower.js");
});



