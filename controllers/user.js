const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const config = require("../config");

/**
 * Generate the token
 * @param {Object} user - user object
 */
exports.generateTokens = (user) => {
  const body = { id: user.id, email: user.email };

  // Sign the JWT token and populate the payload with the user email and id
  const accessToken = jwt.sign({ user: body }, config.accessTokenSecret, {
    expiresIn: config.accessTokenLife,
  });

  // Sign the JWT refresh token
  const refreshToken = jwt.sign({ user: body }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenLife,
  });

  // Send back the token to the user
  return { accessToken, refreshToken };
};

exports.verifyRefreshToken = (refreshToken) => {
  // Verify refresh token
  return jwt.verify(
    refreshToken,
    config.refreshTokenSecret,
    (error, { user }) => {
      if (error) return false;

      // Sign the JWT token and populate the payload with the user email and id
      const accessToken = jwt.sign({ user }, config.accessTokenSecret, {
        expiresIn: config.accessTokenLife,
      });

      return accessToken;
    }
  );
};
