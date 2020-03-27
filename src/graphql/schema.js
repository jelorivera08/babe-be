const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { AuthenticateUserQuery } = require('./query/AuthenticateUserQuery');
const { UsersQuery } = require('./query/UsersQuery');
const { RegionalStockistsQuery } = require('./query/RegionalStockistsQuery');
const { UserCreate, ChangeUserStatus } = require('./mutation/UserMutation');
const { ProductsQuery } = require('./query/ProductsQuery');
const { AddOrderMutation } = require('./mutation/AddOrderMutation');


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authenticateUser: AuthenticateUserQuery,
    users: UsersQuery,
    regionalStockists: RegionalStockistsQuery,
    products: ProductsQuery,
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userCreate: UserCreate,
    changeUserStatus: ChangeUserStatus,
    addOrder: AddOrderMutation,
  }),
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = schema;
