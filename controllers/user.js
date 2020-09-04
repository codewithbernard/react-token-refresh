const jwt = require("jsonwebtoken");

const config = require("../config");

/**
 * Generate the token
 * @param {Object} user - user object
 */
exports.generateToken = (user) => {
  const body = { id: user.id, email: user.email };

  // Sign the JWT token and populate the payload with the user email and id
  const token = jwt.sign({ user: body }, config.secret);

  // Send back the token to the user
  return token;
};
