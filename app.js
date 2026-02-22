const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();

const deviceRoutes = require("./src/routes/device.routes");

const app = express();
app.use(express.json());

connectDB();

app.use("/device", deviceRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);