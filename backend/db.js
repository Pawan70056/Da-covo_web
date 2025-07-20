const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/Dacovo_clothing",)
    .then(() => {
      console.log("✅ MongoDB Connected: localhost");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;
