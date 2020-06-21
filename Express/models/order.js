var mongoose = require("mongoose");

var OrdersSchema = new mongoose.Schema({
  id: String,
  orderID: String,
  itemName: String,
  senderName: String,
  receiverName: String,
  receiverAddress: String,
  deliver: String,
  status: Boolean,
  note: String,
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Orders", OrdersSchema);
