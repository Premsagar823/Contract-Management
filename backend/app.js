const express = require("express");
const cors = require("cors");
const contractRoutes = require("./routes/contractRoutes");
const blueprintRoutes = require("./routes/blueprintRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blueprints", blueprintRoutes);
app.use("/api/contracts", contractRoutes);


app.get("/", (req, res) => {
  res.send("Contract Management API running");
});

module.exports = app;
