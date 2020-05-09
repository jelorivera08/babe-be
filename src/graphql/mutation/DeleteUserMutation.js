/* eslint-disable no-unused-vars */
const { GraphQLString, GraphQLNonNull } = require("graphql");
const { userType } = require("../nodeTypes");
const UsersService = require("../../services/usersService");

const DeleteUserMutation = {
  type: userType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, values) => {
    const usersService = new UsersService();
    const res = await usersService.deleteUser(values);

    return res;
  },
};

module.exports = { DeleteUserMutation };
