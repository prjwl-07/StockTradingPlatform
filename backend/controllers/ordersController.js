const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");

const createOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const userId = req.user.userId;

    // BUY
    if (mode === "BUY") {
      const newOrder = new OrdersModel({
        userId,
        name,
        qty,
        price,
        mode,
      });

      await newOrder.save();

      const existingHolding = await HoldingsModel.findOne({
        userId,
        name,
      });

      if (existingHolding) {
        const oldQty = existingHolding.qty;
        const oldAvg = existingHolding.avg;

        const newQty = oldQty + qty;

        const newAvg = (oldQty * oldAvg + qty * price) / newQty;

        existingHolding.qty = newQty;
        existingHolding.avg = newAvg;

        await existingHolding.save();
      } else {
        const newHolding = new HoldingsModel({
          userId,
          name,
          qty,
          avg: price,
          price,
          net: "0%",
          day: "0%",
        });

        await newHolding.save();
      }

      return res.status(200).send("BUY order saved!");
    }

    // SELL
    if (mode === "SELL") {
      const existingHolding = await HoldingsModel.findOne({
        userId,
        name,
      });

      // User doesn't own this stock
      if (!existingHolding) {
        return res.status(400).json({
          message: "You don't own this stock",
        });
      }

      // Trying to sell more than owned
      if (qty > existingHolding.qty) {
        return res.status(400).json({
          message: "Insufficient holdings",
        });
      }

      // Reduce holding quantity
      existingHolding.qty -= qty;

      // If all shares are sold, remove the holding
      if (existingHolding.qty === 0) {
        await HoldingsModel.deleteOne({
          _id: existingHolding._id,
        });
      } else {
        await existingHolding.save();
      }

      // Save the SELL order only after validation succeeds
      const newOrder = new OrdersModel({
        userId,
        name,
        qty,
        price,
        mode,
      });

      await newOrder.save();

      return res.status(200).send("SELL order saved!");
    }

    return res.status(400).json({
      message: "Invalid order mode",
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      userId: req.user.userId,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

module.exports = { createOrder, getOrders };
