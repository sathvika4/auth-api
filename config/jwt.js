require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "ci_dummy_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "ci_dummy_refresh_secret";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

module.exports = {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
};
