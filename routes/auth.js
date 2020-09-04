const passport = require("passport");

const user = require("../controllers/user");

module.exports = (app) => {
  app.get("/auth", (req, res) => {
    res.send(user.getUser());
  });

  app.post(
    "/auth/signup",
    passport.authenticate("signup", { session: false }),
    (req, res) => {
      return res.json(req.user);
    }
  );

  app.post("/auth/signin", (req, res) => {
    res.send({ hello: true });
  });

  app.post("/auth/signout", (req, res) => {
    res.send({ hello: true });
  });
};
