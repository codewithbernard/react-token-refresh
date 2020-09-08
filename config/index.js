module.exports = {
  port: 8080,
  mongoURI: process.env.MONGO_URI,
  accessTokenSecret: "My secret cat",
  refreshTokenSecret: "My even more secret cat",
  accessTokenLife: 10, // 10 seconds
  refreshTokenLife: 86400,
};
