const Cloud = require("@google-cloud/storage");
const path = require("path");

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: path.join(__dirname, "../../babe-be-46e8a1ce92ea.json"),
  projectId: "babe-be",
});

module.exports = storage;
