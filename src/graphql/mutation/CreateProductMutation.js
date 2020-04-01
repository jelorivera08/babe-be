/* eslint-disable no-unused-vars */
const {
  GraphQLString,
  GraphQLNonNull, GraphQLList,
  GraphQLInt,
} = require('graphql');
const { productType, productInputType } = require('../nodeTypes');
const ProductsService = require('../../services/productsService');


const CreateProductMutation = {
  type: GraphQLList(productType),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_, values) => {
    const productsService = new ProductsService();
    const products = await productsService.createProduct(values);


    return products;
  },
};

module.exports = { CreateProductMutation };
