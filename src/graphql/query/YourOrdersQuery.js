/* eslint-disable no-underscore-dangle */
const { GraphQLList, GraphQLString } = require("graphql");
const { orderType } = require("../nodeTypes");
const OrdersService = require("../../services/ordersService");

const YourOrdersQuery = {
  type: GraphQLList(orderType),
  args: {
    username: { type: GraphQLString },
  },
  resolve: async (_, values) => {
    const ordersService = new OrdersService();
    const res = await ordersService.getYourOrders(values);

    if (res) {
      return res;
    }

    return new Error("Error getting your orders.");
  },
};

module.exports = { YourOrdersQuery };
