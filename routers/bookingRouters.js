const express = require("express");
const bookingRouter = express.Router();
let sk =
  "sk_test_51O84skSGbIn6aY0mNaQ4MHJpFofamlEkJIUqIk6c9opT97vu010Rg7EPJOA1EiaFjEtGI2r9u1W6wP00UakB5E4f00yDHxBbFq";
// This is your test secret API key.
const stripe = require("stripe")(sk);
const { protectRoute } = require("../controllers/authController");
const { createSessions } = require("../controllers/stripeController");
bookingRouter.post("/createSession", createSessions);

bookingRouter.get("/createSession", async function (req, res) {
  res.sendFile(
    "/Users/ASUS/OneDrive/Desktop/Backend Development/app/booking.html"
  );
});
module.exports = bookingRouter;
