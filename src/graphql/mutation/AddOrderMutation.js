/* eslint-disable no-unused-vars */
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const { productInputType, productType } = require('../nodeTypes');
const OrdersService = require('../../services/ordersService');


const AddOrderMutation = {
  type: productType,
  args: {
    user: { type: new GraphQLNonNull(GraphQLString) },
    dateOrdered: { type: new GraphQLNonNull(GraphQLString) },
    product: { type: new GraphQLNonNull(productInputType) },

  },
  resolve: async (_, values) => {
    const usersService = new OrdersService();
    const res = await usersService.addOrder(values);


    return res;
  },
};


module.exports = { AddOrderMutation };
