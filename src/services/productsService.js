const { getDB } = require('../config/databaseConnection');


class OrderService {
  constructor() {
    this.collection = getDB().collection('products');
  }

  async createProduct(values) {
    const existingProduct = await this.collection.findOne({ name: values.name });

    if (existingProduct) return Error('Product already exists.');

    const res = await this.collection.insertOne(values);


    if (res.result.ok === 1) {
      return this.getProducts();
    }

    return Error('Unable to create product.');
  }

  async getProducts() {
    return this.collection.find().toArray();
  }
}


module.exports = OrderService;
