const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const userAuthenticatedType = new GraphQLObjectType({
  name: 'UserAuthenticated',
  fields: {
    id: { type: GraphQLID },
    isAuthenticated: { type: GraphQLString },
    accountType: { type: GraphQLString },
  },
});

const userRegistrationType = new GraphQLObjectType({
  name: 'UserRegistrationType',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    surname: { type: GraphQLString },
    accountType: { type: GraphQLString },
    facebookURL: { type: GraphQLString },
    instagramURL: { type: GraphQLString },
  },
});

const userType = new GraphQLObjectType({
  name: 'userType',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    surname: { type: GraphQLString },
    accountType: { type: GraphQLString },
    facebookURL: { type: GraphQLString },
    instagramURL: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});


module.exports = { userAuthenticatedType, userRegistrationType, userType };
