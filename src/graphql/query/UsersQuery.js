/* eslint-disable no-underscore-dangle */
const {
  GraphQLList,
} = require('graphql');
const { userType } = require('../nodeTypes');
const UsersService = require('../../services/usersService');


const UsersQuery = {
  type: GraphQLList(userType),
  resolve: async () => {
    const userService = new UsersService();
    const res = await userService.getUsers();


    if (res) {
      return res;
    }

    return new Error('Error getting all users.');
  },
};

module.exports = { UsersQuery };
