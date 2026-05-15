const mongoose =
require("mongoose");

const orderSchema =
new mongoose.Schema({

  items: [

    {

      name: String,

      price: Number,

      qty: Number,

      image: String

    }

  ],

  total: Number,

  status: {

    type: String,

    default: "Pending"

  }

});

module.exports =
mongoose.model(
  "Order",
  orderSchema
);