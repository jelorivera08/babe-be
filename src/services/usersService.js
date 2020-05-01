const jwt = require("jsonwebtoken");
const { getDB } = require("../config/databaseConnection");
const OrderService = require("./ordersService");
const config = require("../config");
const PhotoService = require("../services/photoService");

class UsersService {
  constructor() {
    this.collection = getDB().collection("users");
  }

  async activeResellers() {
    const resellers = await this.collection
      .find({ status: "ACTIVE", accountType: "Reseller" })
      .toArray();

    const photoService = new PhotoService();

    const images = await photoService.getAll();

    const resellersWithImages = resellers.map((reseller) => {
      const imageExists = images.find(
        (image) => image.username === reseller.username
      );

      return {
        ...reseller,
        imageUrl: imageExists ? imageExists.imageUrl : null,
      };
    });

    return resellersWithImages;
  }

  async getStockists(values) {
    let regionalStockists = {};

    if (values.region === null) {
      regionalStockists = await this.collection
        .find({
          accountType: values.accountType,
        })
        .toArray();
    } else {
      regionalStockists = await this.collection
        .find({
          accountType: values.accountType,
          region: values.region,
        })
        .toArray();
    }

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

    const completeStockistWithOrders = regionalStockists.map((stockist) => {
      const order = stockistWithOrders.find(
        (v) => v.username === stockist.username
      );

      if (!order) {
        return {
          ...stockist,
          orders: [],
        };
      } else {
        return order;
      }
    });

    return completeStockistWithOrders;
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
        { username, accountType: res.accountType, region: res.region },
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
    const photoService = new PhotoService();

    const images = await photoService.getAll();

    const usersWithImages = exisingUsers.map((user) => {
      const imageExists = images.find(
        (image) => image.username === user.username
      );

      return {
        ...user,
        imageUrl: imageExists ? imageExists.imageUrl : null,
      };
    });

    return usersWithImages;
  }
}

module.exports = UsersService;
