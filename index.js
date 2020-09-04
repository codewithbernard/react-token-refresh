const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const passport = require("passport");

const config = require("./config");
const routes = require("./routes");

// Initialize mongo mondels and connect to database
require("./models");
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Initialize express app
let app = express();
app.server = http.createServer(app);

// Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

// Initialize passport
require("./services/passport");

// Routes
routes(app);

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});
