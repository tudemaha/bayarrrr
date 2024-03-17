const { connect } = require("mongoose");

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const host = process.env.MONGO_HOST;
const db = process.env.MONGO_DATABASE;

const mongoConnect = async () => {
  await connect(`mongodb+srv://${username}:${password}@${host}/${db}`);
};

module.exports = mongoConnect;
