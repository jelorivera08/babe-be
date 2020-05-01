const Cloud = require("@google-cloud/storage");
const path = require("path");

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: path.join(__dirname, "../../babe-be-33840d993b34.json"),
  projectId: "babe-be",
});

module.exports = storage;
