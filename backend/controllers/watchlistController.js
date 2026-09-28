const Watchlist = require("../model/watchlistModel");

const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({
      userId: req.user.userId,
    }).sort({ createdAt: 1 });

    res.status(200).json(watchlist);
  } catch (error) {
    console.error("WATCHLIST ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch watchlist",
    });
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;

    if (!symbol) {
      return res.status(400).json({
        message: "Symbol is required",
      });
    }

    const watchlistItem = await Watchlist.create({
      userId: req.user.userId,
      symbol: symbol.toUpperCase(),
    });

    res.status(201).json(watchlistItem);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Stock already exists in watchlist",
      });
    }

    console.error("WATCHLIST ERROR:", error);

    res.status(500).json({
      message: "Failed to add stock to watchlist",
    });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { symbol } = req.params;

    const deletedItem = await Watchlist.findOneAndDelete({
      userId: req.user.userId,
      symbol: symbol.toUpperCase(),
    });

    if (!deletedItem) {
      return res.status(404).json({
        message: "Stock not found in watchlist",
      });
    }

    res.status(200).json({
      message: "Stock removed from watchlist",
    });
  } catch (error) {
    console.error("WATCHLIST ERROR:", error);

    res.status(500).json({
      message: "Failed to remove stock from watchlist",
    });
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};
