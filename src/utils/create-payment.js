const mongoConnect = require('./../pkg/mongo');
const Payment = require('./../model/Payment')

/**
 * Run this file as a standalone program to create a new payment information. Use 
 */
const createPayment = async () {
    await mongoConnect();
    await Payment.create({

    })
}