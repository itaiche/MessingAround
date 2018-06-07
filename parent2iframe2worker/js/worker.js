(function (self) {
  const registeredHandler = {};
  const privateAPIs = {};
  const _self = self;
  self = {};

  function hideAPIs(APIs){
    APIs.forEach((apiKey)=>{
        privateAPIs[apiKey] = _self[apiKey];
        _self[apiKey] = ()=>{
            console.log('${apiKey} is private ');
        };
    });
  }

  hideAPIs(['postMessage', 'addEventListener', 'onmessage']);

  function messageRouter(message) {
    if (message.data && message.data.command) {
      switch (message.data.command) {
        case "createChannel":
          wixCodeMessageChannelCreation(message);
        break;
        case "loadScript":
          loadScript(message);
          break;
      }
    }
  }

  function loadScript(message){
    importScripts(message.data.scriptUrl);
  }

  function wixCodeMessageChannelCreation(message) {
    //Get AppDefId registered callback for message listener
    const appDefId = message.data.appDefId
    if (registredHandler[message.appDefId]) {
      registredHandler[appDefId](function sendMessage(message) { //Send API
        _self.postMessage({ appDefId, message });
      }, function onMessage(messageHandler) { //Receive API
        port.onmessage = messageHandler;
      });
    } else {
      message.source.postMessage({appDefId: message.data.appDefId, message: "No registered handler"}, message.origin)
    }
  }

  function registerHandler(appDefId, handler) {
    registeredHandler[appDefId] = handler;
  }

  privateAPIs.addEventListener("message", messageRouter);
  self.registerHandler = registeredHandler;

})(self);

