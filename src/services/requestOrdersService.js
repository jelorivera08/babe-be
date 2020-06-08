const { getDB } = require("../config/databaseConnection");

class RequestOrdersService {
  constructor() {
    this.collection = getDB().collection("requestOrders");
  }

  async updateRequestOrder({ orderedBy, dateOrdered, status }) {
    const orderToBeUpdated = await this.collection.findOneAndUpdate(
      {
        orderedBy,
        dateOrdered,
      },
      {
        $set: {
          status,
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (orderToBeUpdated.ok === 1) {
      return orderToBeUpdated.value;
    }

    return Error("Unable to udpate request order.");
  }

  async getIncomingRequestOrders({ stockist }) {
    const incomingRequestOrders = await this.collection
      .find({
        stockist,
      })
      .toArray();

    return incomingRequestOrders;
  }

  async getRequestOrders(values) {
    const requestOrders = await this.collection
      .find({
        orderedBy: values.orderedBy,
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
}

module.exports = RequestOrdersService;
