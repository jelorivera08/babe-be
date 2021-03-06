const { getDB } = require("../config/databaseConnection");

class OrderService {
  constructor() {
    this.collection = getDB().collection("orders");
  }

  async getRequestOrders(values) {
    const requestOrders = await this.collection
      .find({
        orderedBy: values.username,
      })
      .toArray();

    return requestOrders;
  }

  async addRequestOrder(values) {
    const requestOrder = await this.collection.insertOne(values);

    if (requestOrder.insertedCount >= 1) {
      return requestOrder.ops[0];
    }

    return Error("Unable to add request order.");
  }

  async updateOrderNote(values) {
    const order = await this.collection.findOneAndUpdate(
      { user: values.user, dateOrdered: values.dateOrdered },
      {
        $set: {
          notes: values.note,
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (order.ok === 1) {
      return {
        notes: values.note,
      };
    } else {
      return Error("Unable to update note");
    }
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
