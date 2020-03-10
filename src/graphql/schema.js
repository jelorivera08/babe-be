const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { AuthenticateUserQuery } = require('./query/AuthenticateUserQuery');


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authenticateUser: AuthenticateUserQuery,
  }),
});

// const MutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     userCreate: UserCreate,
//     userDelete: UserDelete,
//     userUpdate: UserUpdate
//   })
// });

const schema = new GraphQLSchema({ query: QueryType });

module.exports = schema;
