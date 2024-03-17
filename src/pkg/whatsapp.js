const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-extensions"],
  },
});

module.exports = client;
