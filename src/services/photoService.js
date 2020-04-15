const { getDB } = require("../config/databaseConnection");

class PhotoService {
  constructor() {
    this.collection = getDB().collection("photos");
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async insert(values) {
    const photo = await this.collection.insertOne({
      imageURL: values.imageURL,
      username: values.username,
    });

    if (photo.result.ok === 1) {
      return {
        imageURL: photo.ops[0].imageURL,
        username: photo.ops[0].username,
      };
    }

    return Error("Unable to insert photo.");
  }
}

module.exports = PhotoService;
