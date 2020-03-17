/* eslint-disable no-unused-vars */
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const { userRegistrationType } = require('../nodeTypes');
const UsersService = require('../../services/usersService');


const UserCreate = {
  type: userRegistrationType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    accountType: { type: new GraphQLNonNull(GraphQLString) },
    facebookURL: { type: new GraphQLNonNull(GraphQLString) },
    instagramURL: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, values) => {
    const usersService = new UsersService();
    const res = await usersService.register(values);

    if (res.error) {
      return new Error(res.error);
    }


    return res.ops[0];
  },
};


module.exports = { UserCreate };
