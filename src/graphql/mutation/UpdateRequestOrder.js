/* eslint-disable no-unused-vars */
const { GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");
const RequestOrdersService = require("../../services/requestOrdersService");
const { requestOrderType } = require("../nodeTypes");

const UpdateRequestOrder = {
  type: requestOrderType,
  args: {
    orderedBy: { type: new GraphQLNonNull(GraphQLString) },
    dateOrdered: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, values) => {
    const requestOrdersService = new RequestOrdersService();
    const res = await requestOrdersService.updateRequestOrder(values);

    return res;
  },
};

module.exports = { UpdateRequestOrder };
