const { getDB } = require("../config/databaseConnection");

class RequestOrdersService {
  constructor() {
    this.collection = getDB().collection("requestOrders");
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
