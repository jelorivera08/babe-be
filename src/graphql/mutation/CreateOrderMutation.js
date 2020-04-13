/* eslint-disable no-unused-vars */
const { GraphQLString, GraphQLNonNull, GraphQLList } = require("graphql");
const { orderType, productInputType } = require("../nodeTypes");
const OrdersService = require("../../services/ordersService");

const CreateOrderMutation = {
  type: GraphQLList(orderType),
  args: {
    user: { type: new GraphQLNonNull(GraphQLString) },
    products: { type: new GraphQLNonNull(GraphQLList(productInputType)) },
    dateOrdered: { type: new GraphQLNonNull(GraphQLString) },
    notes: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, values) => {
    const usersService = new OrdersService();
    const orders = await usersService.createOrder(values);

    return orders;
  },
};

module.exports = { CreateOrderMutation };
