
const EVENTS = {
   MOUSELEAVE: "mouseleave",
   MOUSEMOVE: "mousemove",
   MOUSEDOWN: "mousedown",
   MOUSEUP: "mouseup"
};

function bindDocument() {
    window.addEventListener(EVENTS.MOUSEMOVE, mouseMove);
    window.addEventListener(EVENTS.MOUSELEAVE, end);
}

function unbindDocument(){
    window.removeEventListener(EVENTS.MOUSEMOVE, mouseMove);
    window.removeEventListener(EVENTS.MOUSELEAVE, end);
}

function start(triggerElement) {

}

function mouseMove() {

}

function moveElement() {

}

function end() {
    unbindDocument();
}

function measure() {

}

