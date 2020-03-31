const {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt,
  GraphQLInputObjectType,
} = require('graphql');

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

const productType = new GraphQLObjectType({
  name: 'productType',
  fields: {
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

const productInputType = new GraphQLInputObjectType({
  name: 'productInputType',
  fields: {
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

const orderType = new GraphQLObjectType({
  name: 'orderType',
  fields: {
    user: { type: GraphQLString },
    products: { type: GraphQLList(productType) },
    dateOrdered: { type: GraphQLString },
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
    orders: { type: GraphQLList(orderType) },
    description: { type: GraphQLString },
  },
});


module.exports = {
  userAuthenticatedType,
  userRegistrationType,
  userType,
  productType,
  productInputType,
  orderType,
};
