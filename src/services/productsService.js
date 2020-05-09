const { getDB } = require("../config/databaseConnection");

class OrderService {
  constructor() {
    this.collection = getDB().collection("products");
  }

  async deleteProduct(values) {
    const newProducts = await this.collection.findOneAndDelete({
      name: values.name,
    });

    if (newProducts.ok === 1) {
      return newProducts.value;
    } else {
      return Error("Unable to delete product");
    }
  }

  async updateProduct(values) {
    const updatedProduct = await this.collection.findOneAndUpdate(
      { name: values.name },
      {
        $set: {
          resellerAmount: values.resellerAmount,
          regionalAmount: values.regionalAmount,
          provincialAmount: values.provincialAmount,
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (updatedProduct.ok === 1) {
      return updatedProduct.value;
    } else {
      return Error("Unable to update product");
    }
  }

  async createProduct(values) {
    const existingProduct = await this.collection.findOne({
      name: values.name,
    });

    if (existingProduct) return Error("Product already exists.");

    const res = await this.collection.insertOne(values);

    if (res.result.ok === 1) {
      return this.getProducts();
    }

    return Error("Unable to create product.");
  }

  async getProducts(accountType) {
    const adjustAmount = (accountType, product) => {
      switch (accountType) {
        case "ADMIN":
          return product.regionalAmount;
        case "Regional Stockist":
          return product.provincialAmount;
        case "Provincial Stockist":
          return product.resellerAmount;
        default:
          return product.amount;
      }
    };

    const products = await this.collection.find().toArray();

    const adjustedProducts = products.map((product) => ({
      ...product,
      amount: adjustAmount(accountType, product),
    }));

    return adjustedProducts;
  }
}

module.exports = OrderService;
