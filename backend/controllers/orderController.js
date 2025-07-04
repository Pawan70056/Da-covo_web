const Order = require("./../models/orderModel");
const User = require("./../models/userModel");
const errorHandler = require("./../utils/errorHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Make sure this is at the top before accessing env vars

// Validate Stripe key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is missing in environment variables.");
}

// Initialize Stripe
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ⬇️ Place Order
exports.placeOrder = async (req, res, next) => {
  const { _id } = req.user;
  const frontend_url = process.env.FRONTEND_URL;

  const { items, amount, address } = req.body;

  try {
    // Create order in DB
    const order = await Order.create({
      userId: _id,
      items,
      amount,
      address,
    });

    // Clear user cart
    await User.findByIdAndUpdate(_id, { cartData: {} });

    // Format Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.new_price * 100), // Ensure integer cents
      },
      quantity: item.quantity,
    }));

    // Add shipping
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: 100, // $1 shipping
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });

  } catch (err) {
    console.error("Error placing order:", err);
    next(err);
  }
};

// ⬇️ Verify Payment and Finalize Order
exports.verifyOrder = async (req, res, next) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );
      res.status(200).json(order);
    } else {
      const order = await Order.findByIdAndDelete(orderId);
      res.status(200).json(order);
    }
  } catch (err) {
    next(err);
  }
};

// ⬇️ Get Orders for Logged-in User
exports.userOrders = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ userId: _id });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

// ⬇️ Admin: Get All Orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

// ⬇️ Admin: Update Order Status
exports.updateStatus = async (req, res, next) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
