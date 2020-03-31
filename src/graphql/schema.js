const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { AuthenticateUserQuery } = require('./query/AuthenticateUserQuery');
const { UsersQuery } = require('./query/UsersQuery');
const { RegionalStockistsQuery } = require('./query/RegionalStockistsQuery');
const { UserCreate, ChangeUserStatus } = require('./mutation/UserMutation');
const { ProductsQuery } = require('./query/ProductsQuery');
const { UpdateOrderMutation } = require('./mutation/UpdateOrderMutation');
const { AddOrderMutation } = require('./mutation/AddOrderMutation');
const { CreateOrderMutation } = require('./mutation/CreateOrderMutation');
const { ActiveResellersQuery } = require('./query/ActiveResellersQuery');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authenticateUser: AuthenticateUserQuery,
    users: UsersQuery,
    regionalStockists: RegionalStockistsQuery,
    products: ProductsQuery,
    activeResellers: ActiveResellersQuery,
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userCreate: UserCreate,
    changeUserStatus: ChangeUserStatus,
    addOrder: AddOrderMutation,
    updateOrder: UpdateOrderMutation,
    createOrder: CreateOrderMutation,
  }),
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = schema;
