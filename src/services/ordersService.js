const { getDB } = require('../config/databaseConnection');


class OrderService {
  constructor() {
    this.collection = getDB().collection('orders');
  }

  async getOrders() {
    return this.collection.find().toArray();
  }

  async updateOrder(values) {
    const order = await this.collection.findOne(
      { user: values.user, dateOrdered: values.dateOrdered },
    );

    order.products[values.productIndex] = {
      name: values.product.name,
      amount: values.product.amount,
      quantity: values.product.quantity,
    };


    const updatedOrder = await this.collection.findOneAndUpdate(
      { user: values.user, dateOrdered: values.dateOrdered },
      {
        $set: {
          products: [
            ...order.products,
          ],
        },
      }, {
        returnOriginal: false,
      },
    );

    if (updatedOrder.ok === 1) {
      return values.product;
    }
    return new Error('unable to update product');
  }

  async addOrder(values) {
    const order = await this.collection.findOne(
      { user: values.user, dateOrdered: values.dateOrdered },
    );


    const updatedOrder = await this.collection.findOneAndUpdate(
      { user: values.user, dateOrdered: values.dateOrdered },
      {
        $set: {
          products: [
            ...order.products,
            values.product,
          ],
        },
      }, {
        returnOriginal: false,
      },
    );

    if (updatedOrder.ok === 1) {
      return values.product;
    }
    return new Error('unable to add product');
  }
}


module.exports = OrderService;
