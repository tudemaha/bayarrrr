const qrcode = require("qrcode-terminal");

const clientReadyHandler = (client, ...actions) => {
  client.on("ready", () => {
    console.log("Client is ready!");
    actions.forEach((action) => action(client));
  });
};

const qrReadyHandler = (client) => {
  client.on("qr", (qr) => {
    console.log(`QR generated on ${new Date().toISOString()}`);
    qrcode.generate(qr, { small: true });
  });
};

const pingHandler = (client) => {
  client.on("message", (message) => {
    if (message.body == "!ping") {
      message.reply(
        `Hi, ${message._data.notifyName}! Thank you for pinging me.` +
          `\n\n` +
          `_This message was sent by bot._`
      );
    }
  });
};

const messageHandler = ({ msg, rep, client }) => {
  client.on("message", (message) => {
    if (message.body === msg) {
      message.reply(rep);
    }
  });
};

const messageRegexHandler = ({ regex, rep, client }) => {
  client.on("message", (message) => {
    if (regex.test(message.body)) {
      message.reply(rep);
    }
  });
};

const sendMessageHandler = ({ msg, number, client }) => {
  const chatId = number.substring(1) + "@c.us";
  client.sendMessage(chatId, msg);
};

module.exports = {
  clientReadyHandler,
  qrReadyHandler,
  messageHandler,
  messageRegexHandler,
  sendMessageHandler,
  pingHandler,
};
