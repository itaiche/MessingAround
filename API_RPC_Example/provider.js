const SDK = {
  set: function (APIObj) {
    pmrpc.set(APIObj);
    postMessage("set");
  }
};

SDK.set({
  name: "ChatAPI",
  openChat
});

function openChat() {
  //DO SOMETHING
}

const APIS = {};

