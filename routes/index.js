const package = require("../package.json");
const auth = require("./auth");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ version: package.version });
  });

  auth(app);
};
