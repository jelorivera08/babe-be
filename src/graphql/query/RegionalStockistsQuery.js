/* eslint-disable no-underscore-dangle */
const {
  GraphQLList,
} = require('graphql');
const { userType } = require('../nodeTypes');
const UsersService = require('../../services/usersService');


const RegionalStockistsQuery = {
  type: GraphQLList(userType),
  resolve: async () => {
    const userService = new UsersService();
    const res = await userService.getRegionalStockists();


    if (res) {
      return res;
    }

    return new Error('Error getting orders.');
  },
};

module.exports = { RegionalStockistsQuery };
