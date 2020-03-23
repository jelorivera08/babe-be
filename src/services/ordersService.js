const { getDB } = require('../config/databaseConnection');


class OrderService {
  constructor() {
    this.collection = getDB().collection('orders');
  }

  async getOrders() {
    return this.collection.find().toArray();
  }
}


module.exports = OrderService;
