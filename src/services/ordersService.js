const { getDB } = require("../config/databaseConnection");

class OrderService {
  constructor() {
    this.collection = getDB().collection("orders");
  }

  async getYourOrders(values) {
    const yourOrders = await this.collection
      .find({ user: values.username })
      .toArray();

    return yourOrders.sort((a, b) => (a.dateOrdered < b.dateOrdered ? 1 : -1));
  }

  async createOrder(values) {
    const orderWithSameDate = await this.collection
      .find({ dateOrdered: values.dateOrdered })
      .toArray();

    if (orderWithSameDate.length > 0) {
      return new Error("Order date already placed.");
    }

    const res = await this.collection.insertOne(values);

    if (res.result.ok === 1) {
      const allOrders = await this.collection
        .find({ user: values.user })
        .toArray();

      return allOrders;
    }
    return new Error("unable to add order.");
  }

  async getOrders() {
    return this.collection.find().toArray();
  }

  async updateOrder(values) {
    const order = await this.collection.findOne({
      user: values.user,
      dateOrdered: values.dateOrdered,
    });

    order.products[values.productIndex] = {
      name: values.product.name,
      amount: values.product.amount,
      quantity: values.product.quantity,
    };

    const updatedOrder = await this.collection.findOneAndUpdate(
      { user: values.user, dateOrdered: values.dateOrdered },
      {
        $set: {
          products: [...order.products.filter((v) => v.quantity !== 0)],
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (updatedOrder.ok === 1) {
      return values.product;
    }
    return new Error("unable to update product");
  }

  async addOrder(values) {
    const order = await this.collection.findOne({
      user: values.user,
      dateOrdered: values.dateOrdered,
    });

    if (values.product.quantity < 1) {
      return new Error("Product quantity should be more than zero");
    }

    const updatedOrder = await this.collection.findOneAndUpdate(
      { user: values.user, dateOrdered: values.dateOrdered },
      {
        $set: {
          products: [...order.products, values.product],
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (updatedOrder.ok === 1) {
      return values.product;
    }
    return new Error("unable to add product");
  }
}

module.exports = OrderService;
