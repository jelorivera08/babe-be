const { MongoClient } = require("mongodb");

let mongoDB;

const setupDB = (callback) => {
  const uri =
    "mongodb+srv://babeAdmin:a9bc839993@cluster0-yhm3b.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        return callback(err);
      }
      mongoDB = client.db("babe");
      return callback("DB OK");
    }
  );
};

const getDB = () => mongoDB;

module.exports = { setupDB, getDB };
