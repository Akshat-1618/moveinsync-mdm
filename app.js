const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();

const versionRoutes = require("./src/routes/version.routes");

const deviceRoutes = require("./src/routes/device.routes");

const upgradeRoutes = require("./src/routes/upgrade.routes");

const updateRoutes = require("./src/routes/update.routes");

const deviceUpdateRoutes = require("./src/routes/deviceUpdate.routes");

const app = express();
app.use(express.json());

connectDB();

app.use("/device", deviceRoutes);
app.use("/version", versionRoutes);
app.use("/upgrade", upgradeRoutes);
app.use("/update", updateRoutes);
app.use("/device-update", deviceUpdateRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);