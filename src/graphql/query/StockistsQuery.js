/* eslint-disable no-underscore-dangle */
const { GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql");
const { userType } = require("../nodeTypes");
const UsersService = require("../../services/usersService");

const StockistsQuery = {
  type: GraphQLList(userType),
  args: {
    accountType: { type: new GraphQLNonNull(GraphQLString) },
    region: { type: GraphQLString },
  },
  resolve: async (_, values) => {
    const userService = new UsersService();
    const res = await userService.getStockists(values);

    if (res) {
      return res;
    }

    return new Error("Error getting stockists.");
  },
};

module.exports = { StockistsQuery };
