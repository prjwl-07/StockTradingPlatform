const mongoose = require("mongoose");
const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { getStock } = require("../market/dummyMarket");
const User = require("../model/UserModel");

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { name, qty, mode } = req.body;
    const userId = req.user.userId;

    if (!name || !["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({ message: "Invalid order details" });
    }

    if (!Number.isFinite(qty) || qty <= 0) {
      return res.status(400).json({ message: "Quantity must be positive" });
    }

    const stock = getStock(name);

    if (!stock) {
      return res.status(400).json({ message: "Stock not found" });
    }

    const price = stock.currentPrice;

    const result = await session.withTransaction(async () => {
      const user = await User.findById(userId).session(session);

      if (!user) {
        return {
          status: 404,
          body: { message: "User not found" },
        };
      }

      const totalAmount = qty * price;

      // =========================
      // BUY
      // =========================
      if (mode === "BUY") {
        // Atomically check balance and decrease it
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: userId,
            balance: { $gte: totalAmount },
          },
          {
            $inc: { balance: -totalAmount },
          },
          {
            returnDocument: "after",
            session,
          },
        );

        if (!updatedUser) {
          return {
            status: 400,
            body: { message: "Insufficient funds" },
          };
        }

        // Find existing holding
        const updatedHolding = await HoldingsModel.findOneAndUpdate(
          {
            userId,
            name,
          },
          [
            {
              $set: {
                qty: {
                  $add: [{ $ifNull: ["$qty", 0] }, qty],
                },

                avg: {
                  $cond: [
                    { $eq: [{ $ifNull: ["$qty", 0] }, 0] },
                    price,
                    {
                      $divide: [
                        {
                          $add: [
                            { $multiply: ["$qty", "$avg"] },
                            { $multiply: [qty, price] },
                          ],
                        },
                        { $add: ["$qty", qty] },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          {
            returnDocument: "after",
            upsert: true,
            session,
            updatePipeline: true,
          },
        );

        console.log(updatedHolding);

        // Create order
        await new OrdersModel({
          userId,
          name,
          qty,
          price,
          mode,
        }).save({ session });

        return {
          status: 200,
          body: {
            message: "BUY order saved!",
            balance: updatedUser.balance,
          },
        };
      }

      // =========================
      // SELL
      // =========================
      if (mode === "SELL") {
        // Atomically check holding quantity and decrease it
        const updatedHolding = await HoldingsModel.findOneAndUpdate(
          {
            userId,
            name,
            qty: { $gte: qty },
          },
          {
            $inc: { qty: -qty },
          },
          {
            returnDocument: "after",
            session,
          },
        );

        if (!updatedHolding) {
          return {
            status: 400,
            body: {
              message: "Insufficient holdings",
            },
          };
        }

        // Add money atomically
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          {
            $inc: { balance: totalAmount },
          },
          {
            returnDocument: "after",
            session,
          },
        );

        // Remove holding document when quantity becomes zero
        if (updatedHolding.qty === 0) {
          await HoldingsModel.deleteOne(
            { _id: updatedHolding._id },
            { session },
          );
        }

        // Create order
        await new OrdersModel({
          userId,
          name,
          qty,
          price,
          mode,
        }).save({ session });

        return {
          status: 200,
          body: {
            message: "SELL order saved!",
            balance: updatedUser.balance,
          },
        };
      }

      return {
        status: 400,
        body: { message: "Invalid order mode" },
      };
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  } finally {
    await session.endSession();
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
