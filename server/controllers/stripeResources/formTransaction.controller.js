"use strict";
const ConnectedAccountController = require("./connectedAccount.controller");

const FormTransactionController = function () {
  const endpointSecret = process.env.STRIPE_CONNECTED_ACCOUNTS_WEBHOOK_SECRET;

  var handleEvent = async function (req, res) {
    try {
      let event = ConnectedAccountController.verifyRequest(
        req.body,
        req.headers["stripe-signature"],
        endpointSecret,
      );

      let statusCode = 200;
      let responseBody = { message: "event handled!" };
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          const handledPaymentIntent = await _updateTransaction(paymentIntent);
          if (!handledPaymentIntent) {
            statusCode = 500;
            responseBody = { message: "error updating account" };
          }
          break;
        default:
          statusCode = 403;
          responseBody = { message: "transaction: unhandled event type" };
      }
      return res.status(statusCode).json(responseBody);
    } catch (error) {
      return res.status(400).send(`webhook error: ${error.message}`);
    }
  };

  var _updateTransaction = async function (paymentIntent) {
    try {
      console.log("object to handle: " + paymentIntent.id);
      return true;
    } catch (error) {
      console.error("error updating stripe account: " + error.message);
      return false;
    }
  };

  return {
    handleEvent,
  };
};

module.exports = FormTransactionController();
