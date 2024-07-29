require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  chatgptApiKey: process.env.CHATGPT_API_KEY,
};
