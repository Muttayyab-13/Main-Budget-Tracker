// userSchema.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  budgetLimit: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
