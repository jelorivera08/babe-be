/* eslint-disable no-unused-vars */
const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const UsersService = require("../../services/usersService");
const { userType } = require("../nodeTypes");

const UpdateResellerStockMutation = {
  type: userType,
  args: {
    hasStockStatus: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (_, values, params) => {
    const { username } = params.decoded;

    const usersService = new UsersService();

    const res = await usersService.updateHasStock({
      hasStockStatus: values.hasStockStatus,
      username,
    });

    if (res.value) {
      return res.value;
    }

    return Error("unable to update stock status");
  },
};

module.exports = { UpdateResellerStockMutation };
