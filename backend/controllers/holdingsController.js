const { HoldingsModel } = require("../model/HoldingsModel");

const getHoldings = async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      userId: req.user.userId
    });
    res.json(allHoldings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch holdings", error: error.message });
  }
};

module.exports = {getHoldings};
