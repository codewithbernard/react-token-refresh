const passport = require("passport");

const package = require("../package.json");
const auth = require("./auth");

module.exports = (app) => {
  app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send({ version: package.version });
  });

  auth(app);
};
