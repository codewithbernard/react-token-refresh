import http from "http";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

import config from "./config";

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
app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  })
);

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
