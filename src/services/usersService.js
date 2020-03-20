const { getDB } = require('../config/databaseConnection');


class UsersService {
  constructor() {
    this.collection = getDB().collection('users');
  }

  async changeUserStatus({ username, status }) {
    const changeUserStatus = await this.collection.findOneAndUpdate({
      username,
    }, {
      $set: { status },
    }, {
      returnOriginal: false,
    });


    return changeUserStatus;
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


    return this.collection.insertOne({ ...values, status: 'PENDING' });
  }

  async getUsers() {
    const exisingUsers = await this.collection.find().toArray();


    return exisingUsers;
  }
}


module.exports = UsersService;
