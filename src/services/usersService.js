const { getDB } = require('../config/databaseConnection');
const OrderService = require('./ordersService');


class UsersService {
  constructor() {
    this.collection = getDB().collection('users');
  }

  async getRegionalStockists() {
    const regionalStockists = await this.collection.find({ accountType: 'Regional Stockist' }).toArray();
    const orderService = new OrderService();
    const orders = await orderService.getOrders();

    const stockistWithOrders = [];

    orders.forEach((order) => {
      const stockistWithOrdersIndex = stockistWithOrders.findIndex(
        (sOrder) => sOrder.username === order.user,
      );

      if (stockistWithOrdersIndex !== -1) {
        stockistWithOrders[stockistWithOrdersIndex].orders.push(order);
      } else {
        stockistWithOrders.push({
          ...regionalStockists.find((sOrder) => sOrder.username === order.user),
          orders: [order],
        });
      }
    });


    return stockistWithOrders;
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
