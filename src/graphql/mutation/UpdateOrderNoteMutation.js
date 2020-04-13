/* eslint-disable no-unused-vars */
const { GraphQLNonNull, GraphQLString } = require("graphql");
const OrdersService = require("../../services/ordersService");
const { orderType } = require("../nodeTypes");

const UpdateOrderNoteMutation = {
  type: orderType,
  args: {
    dateOrdered: { type: new GraphQLNonNull(GraphQLString) },
    note: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, values, { decoded }) => {
    if (decoded.username !== "admin") {
      return Error("You are not authorized to do update this parameter.");
    }

    const ordersService = new OrdersService();
    const res = await ordersService.updateOrderNote({
      ...values,
    });

    return res;
  },
};

module.exports = { UpdateOrderNoteMutation };
