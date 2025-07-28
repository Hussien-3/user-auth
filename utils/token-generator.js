const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  token = await jwt.sign(payload, process.env.JWT_SECRYT_KEY, {
    expiresIn: "10m",
  });
  return token;
};
