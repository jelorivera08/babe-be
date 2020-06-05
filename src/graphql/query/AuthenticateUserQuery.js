/* eslint-disable no-underscore-dangle */
const { GraphQLString } = require("graphql");
const UsersService = require("../../services/usersService");

const AuthenticateUserQuery = {
  type: GraphQLString,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, { username, password }) => {
    const userService = new UsersService();
    const res = await userService.signIn({ username, password });

    if (res) {
      return res;
    }
    return new Error("Invalid Credentials");
  },
};

module.exports = { AuthenticateUserQuery };
