/* eslint-disable no-unused-vars */
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { productType, productInputType } = require("../nodeTypes");
const ProductsService = require("../../services/productsService");

const CreateProductMutation = {
  type: GraphQLList(productType),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    regionalAmount: { type: new GraphQLNonNull(GraphQLInt) },
    provincialAmount: { type: new GraphQLNonNull(GraphQLInt) },
    resellerAmount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_, values) => {
    const productsService = new ProductsService();
    const products = await productsService.createProduct(values);

    return products;
  },
};

module.exports = { CreateProductMutation };
