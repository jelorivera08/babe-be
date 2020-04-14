/* eslint-disable no-underscore-dangle */
const { GraphQLList } = require("graphql");
const { productType } = require("../nodeTypes");
const ProductsService = require("../../services/productsService");

const ProductsQuery = {
  type: GraphQLList(productType),
  resolve: async (_, values, { decoded }) => {
    const userService = new ProductsService();

    const res = await userService.getProducts(decoded.accountType);

    if (res) {
      return res;
    }

    return new Error("Error getting all products.");
  },
};

module.exports = { ProductsQuery };
