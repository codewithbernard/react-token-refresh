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

  app.get("/auth/refresh", (req, res) => {
    // Extract token from header
    const authHeader = req.header("authorization");
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);

      // Check if refresh token is valid. If yes, generate new access token
      const accessToken = user.verifyRefreshToken(token);
      if (!accessToken) {
        return res.status(401).json({ error: "refresh_token_invalid" });
      }
      return res.json({ token: { accessToken } });
    } else {
      return res.status(401).json({ error: "refresh_token_invalid" });
    }
  });

  app.post(
    "/auth/signup",
    passport.authenticate("signup", { session: false }),
    (req, res) => {
      return res.json({
        user: req.user,
        token: user.generateTokens(req.user),
      });
    }
  );

  app.post(
    "/auth/signin",
    passport.authenticate("signin", { session: false }),
    (req, res) => {
      return res.json({
        user: req.user,
        token: user.generateTokens(req.user),
      });
    }
  );

  app.post("/auth/signout", (req, res) => {
    req.logout();
    return res.send({});
  });
};
