(function () {

  let ball;
  addEventListener('load', createBall);
  document.body.addEventListener('keyUp', moveBall);

  function createBall() {
    ball = document.createElement('DIV');
    ball.setAttribute('id', 'movable');
    document.body.appendChild(ball);
  }


  function moveBall(e) {
     e.keycode
  }

})(window);