const { getDB } = require("../config/databaseConnection");

class PhotoService {
  constructor() {
    this.collection = getDB().collection("photos");
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async insert(values) {
    const isExisting = await this.collection.findOne({
      username: values.username,
    });

    if (isExisting.username) {
      const photo = await this.collection.findOneAndUpdate(
        { username: values.username },
        {
          $set: {
            imageUrl: values.imageUrl,
          },
        },
        {
          returnOriginal: false,
        }
      );

      if (photo.ok === 1) {
        return {
          imageUrl: photo.value.imageUrl,
          username: photo.value.username,
        };
      }
    } else {
      const photo = await this.collection.insertOne({
        imageUrl: values.imageUrl,
        username: values.username,
      });

      if (photo.result.ok === 1) {
        return {
          imageUrl: photo.ops[0].imageUrl,
          username: photo.ops[0].username,
        };
      }
    }
    return Error("Unable to insert photo.");
  }
}

module.exports = PhotoService;
