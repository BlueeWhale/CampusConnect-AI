const mongoose =
require("mongoose");

const foodSchema =
new mongoose.Schema({

  name: String,

  price: Number,

  description: String,

  image: String

}, {
  timestamps: true
});

module.exports =
mongoose.model(
  "Food",
  foodSchema
);
