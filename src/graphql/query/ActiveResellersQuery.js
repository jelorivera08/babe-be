/* eslint-disable no-underscore-dangle */
const {
  GraphQLList,
} = require('graphql');
const { userType } = require('../nodeTypes');
const UsersService = require('../../services/usersService');


const ActiveResellersQuery = {
  type: GraphQLList(userType),
  resolve: async () => {
    const userService = new UsersService();
    const res = await userService.activeResellers();

    if (res) {
      return res;
    }

    return new Error('Error getting active resellers.');
  },
};

module.exports = { ActiveResellersQuery };
