const package = require("../package.json");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ version: package.version });
  });
};
