require("dotenv").config();
const mongoConnect = require("../pkg/mongo");
const Payment = require("../model/Payment");

/** Run this file as a standalone program to create new document in collection.*/
(async () => {
  await mongoConnect();
  await Payment.create({
    name: "Tude Maha",
    wa: "+6285123456789",
    description: "pembayaran servis laptop",
    items: [
      {
        name: "Keyboard",
        price: 100000,
      },
    ],
    total: 100000,
    payments: [
      {
        date: new Date(),
        amount: 50000,
      },
    ],
    remains: 0,
  });
})();
