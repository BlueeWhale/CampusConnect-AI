const mongoose =
require("mongoose");

const ticketSchema =
new mongoose.Schema({

  userId: String,

  eventId: String,

  qrCode: String,

  verified: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports =
mongoose.model(
  "Ticket",
  ticketSchema
);