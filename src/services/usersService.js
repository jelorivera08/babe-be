const jwt = require("jsonwebtoken");
const { getDB } = require("../config/databaseConnection");
const OrderService = require("./ordersService");
const config = require("../config");
const PhotoService = require("../services/photoService");

class UsersService {
  constructor() {
    this.collection = getDB().collection("users");
  }

  async getRequestOrderStockists(values) {
    let accountType = "";

    if (values.accountType === "Provincial Stockist") {
      accountType = "Regional Stockist";
    } else if (values.accountType === "Regional Stockist") {
      accountType = "ADMIN";
      values.region = null;
    } else if (values.accountType === "Reseller") {
      accountType = "Provincial Stockist";
    }

    try {
      const stockists = await this.collection
        .find({ accountType, region: values.region, status: "ACTIVE" })
        .toArray();

      return stockists;
    } catch (err) {
      return Error("Unable to get list of stockists");
    }
  }

  async updateUser(values) {
    Object.keys(values).forEach(
      (key) => values[key] == null && delete values[key]
    );

    const updatedUser = await this.collection.findOneAndUpdate(
      {
        username: values.username,
      },
      {
        $set: { ...values, status: "PENDING" },
      },
      {
        returnOriginal: false,
      }
    );

    if (updatedUser.ok === 1) {
      return updatedUser.value;
    }

    return null;
  }

  async deleteUser({ username }) {
    const deletedUser = await this.collection.findOneAndDelete({ username });

    if (deletedUser.ok === 1) {
      return deletedUser.value;
    } else {
      return Error("Unable to delete user.");
    }
  }

  async getUserInfo({ username }) {
    const userInfo = await this.collection.findOne({ username });

    const photoService = new PhotoService();

    const images = await photoService.getAll();

    const userWithImage =
      images.find((image) => image.username === userInfo.username) || {};

    return { ...userInfo, imageUrl: userWithImage.imageUrl };
  }

  async updateHasStock({ username, hasStockStatus }) {
    const reseller = await this.collection.findOneAndUpdate(
      {
        status: "ACTIVE",
        accountType: "Reseller",
        username,
      },
      {
        $set: { hasStock: hasStockStatus },
      },
      {
        returnOriginal: false,
      }
    );

    return reseller;
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

    if (res.status !== "ACTIVE")
      return Error("Your account is not yet activated.");

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

    return this.collection.insertOne({
      ...values,
      status: "PENDING",
      hasStock: false,
    });
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
