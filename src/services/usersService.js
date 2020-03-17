const { getDB } = require('../config/databaseConnection');


class UsersService {
  constructor() {
    this.collection = getDB().collection('users');
  }

  signIn({ username, password }) {
    return new Promise((resolve, reject) => {
      this.collection.findOne({ username, password }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  async register(values) {
    const existingUsername = await this.collection.findOne({ username: values.username });

    if (existingUsername && existingUsername.username) {
      return { error: 'Username already exists.' };
    }


    return this.collection.insertOne(values);
  }
}


module.exports = UsersService;
