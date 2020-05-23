/* eslint-disable no-unused-vars */
const { GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");
const { requestOrderType, requestOrderInputType } = require("../nodeTypes");
const RequestOrdersService = require("../../services/requestOrdersService");

const AddRequestOrder = {
  type: requestOrderType,
  args: {
    notes: { type: GraphQLString },
    dateOrdered: { type: new GraphQLNonNull(GraphQLString) },
    orders: { type: new GraphQLNonNull(GraphQLList(requestOrderInputType)) },
    stockist: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, values, { decoded }) => {
    const requestOrdersService = new RequestOrdersService();
    const res = await requestOrdersService.addRequestOrder({
      ...values,
      orderedBy: decoded.username,
      status: "PENDING",
    });

    return res;
  },
};

module.exports = { AddRequestOrder };
