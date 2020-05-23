const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");

const userRegistrationType = new GraphQLObjectType({
  name: "UserRegistrationType",
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

const requestOrderInputType = new GraphQLInputObjectType({
  name: "RequestOrderInputType",
  fields: {
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

const productType = new GraphQLObjectType({
  name: "productType",
  fields: {
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
    regionalAmount: { type: GraphQLInt },
    provincialAmount: { type: GraphQLInt },
    resellerAmount: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

const requestOrderType = new GraphQLObjectType({
  name: "RequestOrderType",
  fields: {
    orderedBy: { type: GraphQLString },
    notes: { type: GraphQLString },
    dateOrdered: { type: GraphQLString },
    orders: { type: GraphQLList(productType) },
    stockist: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});

const productInputType = new GraphQLInputObjectType({
  name: "productInputType",
  fields: {
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

const orderType = new GraphQLObjectType({
  name: "orderType",
  fields: {
    user: { type: GraphQLString },
    products: { type: GraphQLList(productType) },
    dateOrdered: { type: GraphQLString },
    notes: { type: GraphQLString },
  },
});

const userType = new GraphQLObjectType({
  name: "userType",
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
    address: { type: GraphQLString },
    areaOfDistribution: { type: GraphQLString },
    region: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    hasStock: { type: GraphQLBoolean },
  },
});

module.exports = {
  userRegistrationType,
  userType,
  requestOrderType,
  requestOrderInputType,
  productType,
  productInputType,
  orderType,
};
