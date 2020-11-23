const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const cors = require('cors');

const UserRoutes = require("./routes/UserRoutes");
const ReviewRoutes = require("./routes/ReviewRoutes");

// parse application/json
app.use(BodyParser.json());
app.use(cors());

app.use("/api/user", UserRoutes);
app.use("/api/review", ReviewRoutes);

module.exports = app;