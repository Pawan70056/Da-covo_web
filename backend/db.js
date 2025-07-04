const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/dacovofashionstore",)
    .then(() => {
      console.log("✅ MongoDB Connected: localhost");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;
