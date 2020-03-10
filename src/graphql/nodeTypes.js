const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const userAuthenticatedType = new GraphQLObjectType({
  name: 'UserAuthenticated',
  fields: {
    _id: { type: GraphQLID },
    isAuthenticated: { type: GraphQLString },
    userType: { type: GraphQLString },
  },
});

module.exports = { userAuthenticatedType };
