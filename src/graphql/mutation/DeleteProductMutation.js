/* eslint-disable no-unused-vars */
const { GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql");
const { productType } = require("../nodeTypes");
const ProductsService = require("../../services/productsService");

const DeleteProductMutation = {
  type: productType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, values) => {
    const productsService = new ProductsService();
    const res = await productsService.deleteProduct(values);

    return res;
  },
};

module.exports = { DeleteProductMutation };
