const worker = new Worker('js/worker.js');

function adminChannelMessage(message) {
  const {port} = message.ports[0];
  worker.postMessage({appDefId: appDefId, message: "createChannel"}, [port]);
}

window.addEventListener('message', messageRouter);

function messageRouter(message) {
  const command = message && message.data && message.data.command;
  switch (command) {
    case 'createChannel':
      adminChannelMessage(message);
      break;
    default:
      break;
  }
}

