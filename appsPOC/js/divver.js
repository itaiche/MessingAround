const divAdder = {
    active: true,
    counter: 0,
    states: {
      ACTIVE: "Stop Adding DIVS",
      INACTIVE: "Add DIVS"
    }
  }
;

bindToLoadState(function () {
  addControlButton(changeState, divAdder.states.ACTIVE);
  randomDOM();
});

function randomDOM() {
  const div = document.createElement("DIV");
  divAdder.counter = divAdder.counter + 1;
  div.className = "counting";
  div.style.backgroundColor = randomColor();
  div.innerHTML = '' + divAdder.counter;
  document.body.appendChild(div);
  if (divAdder.active) {
    setTimeout(randomDOM, (Math.random() * 999));
  }
}

function randomColor() {
  return "rgba(" + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ', ' + getAlpha()+ ')';
}

function getAlpha(){
  const alpha = Math.random();
  return alpha > 0 ? alpha : 0.5;

}

function changeState() {
  divAdder.active = !divAdder.active;
  this.innerHTML = divAdder.active ? divAdder.states.ACTIVE : divAdder.states.INACTIVE;
  if (divAdder.active) {
    randomDOM();
  }
}