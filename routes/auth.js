const passport = require("passport");
const user = require("../controllers/user");

module.exports = (app) => {
  app.get(
    "/auth",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      return res.json(req.user);
    }
  );

  app.post(
    "/auth/signup",
    passport.authenticate("signup", { session: false }),
    (req, res) => {
      return res.json({
        user: req.user,
        token: user.generateToken(req.user),
      });
    }
  );

  app.post(
    "/auth/signin",
    passport.authenticate("signin", { session: false }),
    (req, res) => {
      return res.json({
        user: req.user,
        token: user.generateToken(req.user),
      });
    }
  );

  app.post("/auth/signout", (req, res) => {
    req.logout();
    return res.send({});
  });
};
