/* eslint-disable no-underscore-dangle */
const { GraphQLList, GraphQLString } = require("graphql");
const { requestOrderType } = require("../nodeTypes");
const RequestOrdersService = require("../../services/RequestOrdersService");

const IncomingRequestOrders = {
  type: GraphQLList(requestOrderType),
  resolve: async (_, values, { decoded }) => {
    const requestOrdersService = new RequestOrdersService();

    const res = await requestOrdersService.getIncomingRequestOrders({
      stockist: decoded.username,
    });

    if (res) {
      return res;
    }

    return new Error("Error getting your orders.");
  },
};

module.exports = { IncomingRequestOrders };
