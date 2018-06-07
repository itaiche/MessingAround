function createChannel(appDefId, target) {
  return new Promise(function (resolve, reject) {
    //CREATE message channel by PM to santa
    //https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging
    //return the API wrapping the channel with send , receive APIs
    if (target && appDefId) {
      const channel = new MessageChannel();
      target.contentWindow.postMessage({appDefId: appDefId, message: "createChannel"}, target.origin, [channel.port2]);
      resolve(function sendMessage(message) { //Send API
        channel.port2.postMessage(message);
      }, function onMessage(messageHandler) { //Receive API
        channel.port1.onmessage = messageHandler;
      });
    } else {
      reject("Missing target window or appDefId");
    }
  });
}



