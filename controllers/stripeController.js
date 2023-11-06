let sk =
  "sk_test_51O84skSGbIn6aY0mNaQ4MHJpFofamlEkJIUqIk6c9opT97vu010Rg7EPJOA1EiaFjEtGI2r9u1W6wP00UakB5E4f00yDHxBbFq";
// This is your test secret API key.
const stripe = require("stripe")(sk);
const planModel = require("../models/planModels");
const userModel = require("../models/userModel");
let pid = "pr_1234";
module.exports.createSessions = async function createSessions(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sample Payment",
            },
            unit_amount: 200*100, // Amount in cents (e.g., $10.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create session" });
  }
};
