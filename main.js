require("dotenv").config();
const mongoConnect = require("./src/pkg/mongo");
const waClient = require("./src/pkg/whatsapp");
const {
  clientReadyHandler,
  qrReadyHandler,
  messageRegexHandler,
  pingHandler,
} = require("./src/controller/whatsapp-controller");

const startMongo = async () => {
  await mongoConnect();
};

const startWa = () => {
  clientReadyHandler(waClient);
  qrReadyHandler(waClient);
  pingHandler(waClient);
  messageRegexHandler({
    regex: /^[Pp]+$/,
    rep:
      "Please use greetings when starting a chat." +
      "\n" +
      "(Tolong awali chat dengan salam.)" +
      "\n\n" +
      `_This message was sent by bot._`,
    client: waClient,
  });
  waClient.initialize();
};

startMongo();
startWa();
