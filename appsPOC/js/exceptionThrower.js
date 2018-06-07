(function () {

  const exceptionThrower = [evalException, throwERR, throwRange, throwNumber, throwDOM];
  let active = true;
  const state = {
    INACTIVE: "Throw Exceptions",
    ACTIVE: "Stop throwing"
  };

  bindToLoadState(function () {
    addControlButton(changState, state.ACTIVE);
    throwException();
  });

  function throwDOM() {
    throw new DOMException("Life not found");
  }

  function throwRange(){
      throw new RangeError("Your out of bounds sir!!");
  }

  function throwNumber(){
    throw new RangeError("Your out of bounds sir!!");
  }

  function throwERR() {
    throw new Error("HHHH What a lovely error!");
  }

  function evalException() {
    eval('func(sre){ const x =}')
  }

  function throwException() {
    scheduleException();
    exceptionThrower[Math.floor(Math.random() * (exceptionThrower.length))]();
  }

  function scheduleException(){
    if (active) {
      setTimeout(throwException, Math.random() * 2000);
    }
  }

  function changState() {
    active = !active;
    if (active) {
      throwException();
    }
    this.innerHTML = active ? state.ACTIVE : state.INACTIVE;
  }
})();


