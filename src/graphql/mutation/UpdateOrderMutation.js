/* eslint-disable no-unused-vars */
const {
  GraphQLString,
  GraphQLNonNull, GraphQLInt,
} = require('graphql');
const { productInputType, productType } = require('../nodeTypes');
const OrdersService = require('../../services/ordersService');


const UpdateOrderMutation = {
  type: productType,
  args: {
    user: { type: new GraphQLNonNull(GraphQLString) },
    dateOrdered: { type: new GraphQLNonNull(GraphQLString) },
    product: { type: new GraphQLNonNull(productInputType) },
    productIndex: { type: new GraphQLNonNull(GraphQLInt) },

  },
  resolve: async (_, values) => {
    const usersService = new OrdersService();
    const res = await usersService.updateOrder(values);


    return res;
  },
};


module.exports = { UpdateOrderMutation };
