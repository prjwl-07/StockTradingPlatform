require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes
const holdingsRoutes = require("./routes/holdingsRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

// port and url
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const app = express();


// middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// managing the routes
app.use("/allHoldings", holdingsRoutes);
app.use("/allPositions", positionsRoutes);
app.use("/newOrder", ordersRoutes);
app.use("/auth", authRoutes);
app.use("/market", marketRoutes);
app.use("/watchlist", watchlistRoutes);


const startServer = async () => {
  try {
    await mongoose.connect(url);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();
