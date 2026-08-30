const { model, Schema } = require("mongoose");

const OrdersSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

const OrdersModel = model("order", OrdersSchema);

module.exports = { OrdersModel, OrdersSchema };
