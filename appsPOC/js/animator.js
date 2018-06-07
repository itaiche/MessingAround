(function (window) {
  const animatorConfig = {
    classes: ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flip", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "hinge", "jackInTheBox", "rollIn", "rollOut"],
    animatedClass: "animated ",
    animationEvents: {
      START: "animationstart",
      END: "animationend",
      ITERATION: "animationiteration",
      CANCEL: "animationcancel"
    },
    active: true,
    timeout: null,
    states: {
      ACTIVE: "Stop Animating",
      INACTIVE: "Start Animating"
    }
  };

  bindToLoadState(function () {
    loadCSS("css/animate.css");
    addControlButton(changeAnimatorState, animatorConfig.states.ACTIVE);
    animateIt();
  });

  function animateIt() {

    const selectedDiv = getDivToAnimate();
    const selectedAnimation = getAnimationClass();

    const reset = resetStyle(selectedDiv, selectedAnimation);

    if (selectedDiv) {
      selectedDiv.addEventListener(animatorConfig.animationEvents.END, reset);
      selectedDiv.className = selectedDiv.className + ' ' + selectedAnimation;
    }

    if (animatorConfig.active) {
      animatorConfig.timeout = setTimeout(animateIt, Math.random() * 1000);
    }

  }

  function resetStyle(selectedDiv, selectedAnimation) {
    return function () {
      const regEx = new RegExp(selectedAnimation, 'g');
      selectedDiv.className = this.className.replace(regEx, '').trim();
    };
  }

  function getAnimationClass() {
    return animatorConfig.animatedClass + animatorConfig.classes[Math.floor(Math.random() * animatorConfig.classes.length)];
  }

  function getDivToAnimate() {
    let divs = document.querySelectorAll("div.counting");
    const selectedDiv = divs ? divs[Math.floor(Math.random() * divs.length)] : null;
    divs = null;
    return selectedDiv;
  }

  function changeAnimatorState() {
    animatorConfig.active = !animatorConfig.active;
    if (animatorConfig.timeout) {
      clearTimeout(animatorConfig.timeout);
      animatorConfig.timeout = null;
    }
    this.innerHTML = animatorConfig.active ? animatorConfig.states.ACTIVE : animatorConfig.states.INACTIVE;
    if(animatorConfig.active){
      animateIt();
    }
  }
})(window);