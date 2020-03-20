/* eslint-disable no-underscore-dangle */
const {
  GraphQLString,
} = require('graphql');
const { userAuthenticatedType } = require('../nodeTypes');
const UsersService = require('../../services/usersService');


const AuthenticateUserQuery = {
  type: userAuthenticatedType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, { username, password }) => {
    const userService = new UsersService();
    const res = await userService.signIn({ username, password });


    if (res) {
      return {
        id: res._id,
        isAuthenticated: true,
        accountType: res.accountType,
      };
    }
    return new Error('Invalid Credentials');
  },
};

module.exports = { AuthenticateUserQuery };
