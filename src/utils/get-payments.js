const Payments = require("../model/Payment");

const getNonPaidOffPayments = async () => {
  const data = await Payments.find({remains: {$gt: 0}});
  return data;
};

module.exports = getNonPaidOffPayments;
