/* eslint-disable no-unused-vars */
const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const UsersService = require("../../services/usersService");
const { userType } = require("../nodeTypes");

const UpdateUserMutation = {
  type: userType,
  args: {
    username: { type: GraphQLString },
    firstName: { type: GraphQLString },
    facebookURL: { type: GraphQLString },
    instagramURL: { type: GraphQLString },
    surname: { type: GraphQLString },
    accountType: { type: GraphQLString },
    address: { type: GraphQLString },
    areaOfDistribution: { type: GraphQLString },
    region: { type: GraphQLString },
  },
  resolve: async (_, values) => {
    const usersService = new UsersService();

    const res = await usersService.updateUser(values);

    if (res) {
      return res;
    }

    return Error("unable to update stock status");
  },
};

module.exports = { UpdateUserMutation };
