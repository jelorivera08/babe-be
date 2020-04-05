const jwt = require("jsonwebtoken");
const { getDB } = require("../config/databaseConnection");
const OrderService = require("./ordersService");
const config = require("../config");

class UsersService {
  constructor() {
    this.collection = getDB().collection("users");
  }

  async activeResellers() {
    return this.collection
      .find({ status: "ACTIVE", accountType: "Reseller" })
      .toArray();
  }

  async getStockists(values) {
    const regionalStockists = await this.collection
      .find({ accountType: values.accountType })
      .toArray();

    const orderService = new OrderService();
    const orders = await orderService.getOrders();

    const stockistWithOrders = [];

    orders.forEach((order) => {
      const stockistWithOrdersIndex = stockistWithOrders.findIndex(
        (sOrder) => sOrder.username === order.user
      );

      if (stockistWithOrdersIndex !== -1) {
        stockistWithOrders[stockistWithOrdersIndex].orders.push(order);
      } else {
        const existingOrder = regionalStockists.find(
          (sOrder) => sOrder.username === order.user
        );

        if (existingOrder) {
          stockistWithOrders.push({
            ...existingOrder,
            orders: [order],
          });
        }
      }
    });

    return stockistWithOrders;
  }

  async changeUserStatus({ username, status }) {
    const changeUserStatus = await this.collection.findOneAndUpdate(
      {
        username,
      },
      {
        $set: { status },
      },
      {
        returnOriginal: false,
      }
    );

    return changeUserStatus;
  }

  async signIn({ username, password }) {
    const res = await this.collection.findOne({ username, password });

    if (res !== null) {
      return jwt.sign(
        { username, accountType: res.accountType },
        config.secret,
        { expiresIn: "24h" }
      );
    }

    return Error("Invalid Credentials");
  }

  async register(values) {
    const existingUsername = await this.collection.findOne({
      username: values.username,
    });

    if (existingUsername && existingUsername.username) {
      return { error: "Username already exists." };
    }

    return this.collection.insertOne({ ...values, status: "PENDING" });
  }

  async getUsers() {
    const exisingUsers = await this.collection.find().toArray();

    return exisingUsers;
  }
}

module.exports = UsersService;
