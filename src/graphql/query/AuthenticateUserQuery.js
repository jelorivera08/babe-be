/* eslint-disable no-underscore-dangle */
const {
  GraphQLString,
} = require('graphql');
const { userAuthenticatedType } = require('../nodeTypes');
const MongoDBRepository = require('../../repository/mongoDbRepository');


const AuthenticateUserQuery = {
  type: userAuthenticatedType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, { username, password }) => {
    const usersRepository = new MongoDBRepository('users');
    const res = await usersRepository.signIn({ username, password });


    if (res) {
      return {
        _id: res._id,
        isAuthenticated: true,
        userType: res.userType,
      };
    }
    return new Error('Invalid Credentials');
  },
};

module.exports = { AuthenticateUserQuery };
