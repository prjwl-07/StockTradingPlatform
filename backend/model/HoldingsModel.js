const { model, Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  avg: {
    type: Number,
    required: true,
  },
});

// One holding per user per stock
HoldingsSchema.index({ userId: 1, name: 1 }, { unique: true });

const HoldingsModel = model("holding", HoldingsSchema);

module.exports = { HoldingsModel, HoldingsSchema };
