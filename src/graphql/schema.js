const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { AuthenticateUserQuery } = require('./query/AuthenticateUserQuery');
const { UsersQuery } = require('./query/UsersQuery');

const { UserCreate } = require('./mutation/UserMutation');


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authenticateUser: AuthenticateUserQuery,
    users: UsersQuery,
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userCreate: UserCreate,
  }),
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = schema;
