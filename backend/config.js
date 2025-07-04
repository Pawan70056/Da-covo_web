const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  frontendUrl: process.env.FRONTEND_URL,
  port: process.env.PORT || 4000
};
