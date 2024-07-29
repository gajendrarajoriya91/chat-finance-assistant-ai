const fs = require("fs");
const path = require("path");

const readJsonFile = (fileName) => {
  const filePath = path.join(__dirname, "..", fileName);
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

module.exports = {
  readJsonFile,
};
