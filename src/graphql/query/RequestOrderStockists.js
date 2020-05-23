/* eslint-disable no-underscore-dangle */
const { GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql");
const { userType } = require("../nodeTypes");
const UsersService = require("../../services/usersService");

const RequestOrderStockists = {
  type: GraphQLList(userType),
  args: {},
  resolve: async (_, values, { decoded }) => {
    const userService = new UsersService();
    const res = await userService.getRequestOrderStockists({
      accountType: decoded.accountType,
      region: decoded.region,
    });

    if (res) {
      return res;
    }

    return new Error("Error getting stockists.");
  },
};

module.exports = { RequestOrderStockists };
