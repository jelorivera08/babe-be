/* eslint-disable no-underscore-dangle */

const { userType } = require("../nodeTypes");
const UsersService = require("../../services/usersService");

const UserInfoQuery = {
  type: userType,
  resolve: async (_, req, { decoded }) => {
    const userService = new UsersService();
    const res = await userService.getUserInfo({ username: decoded.username });

    if (res) {
      return res;
    }

    return new Error("Error getting user info.");
  },
};

module.exports = { UserInfoQuery };
