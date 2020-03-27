const { getDB } = require('../config/databaseConnection');


class OrderService {
  constructor() {
    this.collection = getDB().collection('products');
  }

  async getProducts() {
    return this.collection.find().toArray();
  }
}


module.exports = OrderService;
