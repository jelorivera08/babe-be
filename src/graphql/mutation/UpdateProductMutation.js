/* eslint-disable no-unused-vars */
const { GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");
const { productType } = require("../nodeTypes");
const ProductsService = require("../../services/productsService");

const UpdateProductMutation = {
  type: productType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    regionalAmount: { type: new GraphQLNonNull(GraphQLInt) },
    resellerAmount: { type: new GraphQLNonNull(GraphQLInt) },
    provincialAmount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_, values) => {
    const productsService = new ProductsService();
    const res = await productsService.updateProduct(values);

    return res;
  },
};

module.exports = { UpdateProductMutation };
