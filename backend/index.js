require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3005;
const uri = process.env.MONGO_URL;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Seeding holdings endpoint
app.get("/addHoldings", async (req, res) => {
  const tempHoldings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+3.49%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+2.92%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+6.45%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-3.72%",
      day: "-0.01%",
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "-3.71%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "+32.63%",
      day: "-0.34%",
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "-0.17%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "+19.15%",
      day: "-0.24%",
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "+5.03%",
      day: "-0.25%",
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+18.08%",
      day: "+0.32%",
    },
  ];

  try {
    await HoldingsModel.deleteMany({});
    await HoldingsModel.insertMany(tempHoldings);
    res.status(200).send("Holdings data seeded successfully!");
  } catch (error) {
    console.error("Seeding holdings failed:", error);
    res.status(500).send("Seeding holdings failed: " + error.message);
  }
});

// Seeding positions endpoint
app.get("/addPositions", async (req, res) => {
  const tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    },
  ];

  try {
    await PositionsModel.deleteMany({});
    await PositionsModel.insertMany(tempPositions);
    res.status(200).send("Positions data seeded successfully!");
  } catch (error) {
    console.error("Seeding positions failed:", error);
    res.status(500).send("Seeding positions failed: " + error.message);
  }
});

// Fetch all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    res.status(200).json(holdings);
  } catch (error) {
    res.status(500).send("Error fetching holdings: " + error.message);
  }
});

// Fetch all positions
app.get("/allPositions", async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).send("Error fetching positions: " + error.message);
  }
});

// Fetch all orders
app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
});

// Place a new order
app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  
  if (!name || !qty || !price || !mode) {
    return res.status(400).send("Missing required fields: name, qty, price, mode");
  }

  try {
    // 1. Create order entry
    const newOrder = new OrdersModel({
      name,
      qty: Number(qty),
      price: Number(price),
      mode,
    });
    await newOrder.save();

    // 2. Adjust Holdings dynamically
    const existingHolding = await HoldingsModel.findOne({ name });

    if (mode.toUpperCase() === "BUY") {
      if (existingHolding) {
        // Average cost recalculation
        const totalCost = (existingHolding.avg * existingHolding.qty) + (Number(price) * Number(qty));
        const totalQty = existingHolding.qty + Number(qty);
        existingHolding.avg = totalCost / totalQty;
        existingHolding.qty = totalQty;
        existingHolding.price = Number(price); // LTP updates
        await existingHolding.save();
      } else {
        const newHolding = new HoldingsModel({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "0.00%",
          day: "0.00%",
        });
        await newHolding.save();
      }
    } else if (mode.toUpperCase() === "SELL") {
      if (existingHolding) {
        if (existingHolding.qty > Number(qty)) {
          existingHolding.qty -= Number(qty);
          await existingHolding.save();
        } else {
          // If selling all or more than owned, remove the holding
          await HoldingsModel.deleteOne({ _id: existingHolding._id });
        }
      }
    }

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Failed to place order:", error);
    res.status(500).send("Error saving order: " + error.message);
  }
});

// Listen on Port
app.listen(PORT, async () => {
  console.log(`App started on port ${PORT}!`);

  try {
    await mongoose.connect(uri);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
});
