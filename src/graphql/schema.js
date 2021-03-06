const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { AuthenticateUserQuery } = require("./query/AuthenticateUserQuery");
const { UsersQuery } = require("./query/UsersQuery");
const { StockistsQuery } = require("./query/StockistsQuery");
const { UserCreate, ChangeUserStatus } = require("./mutation/UserMutation");
const { ProductsQuery } = require("./query/ProductsQuery");
const { UpdateOrderMutation } = require("./mutation/UpdateOrderMutation");
const { AddOrderMutation } = require("./mutation/AddOrderMutation");
const { CreateOrderMutation } = require("./mutation/CreateOrderMutation");
const { ActiveResellersQuery } = require("./query/ActiveResellersQuery");
const { CreateProductMutation } = require("./mutation/CreateProductMutation");
const {
  UpdateOrderNoteMutation,
} = require("./mutation/UpdateOrderNoteMutation");
const { YourOrdersQuery } = require("./query/YourOrdersQuery");
const {
  UpdateResellerStockMutation,
} = require("./mutation/UpdateResellerStockMutation");
const { UserInfoQuery } = require("./query/UserInfoQuery");

const { UpdateProductMutation } = require("./mutation/UpdateProductMutation");
const { DeleteProductMutation } = require("./mutation/DeleteProductMutation");
const { DeleteUserMutation } = require("./mutation/DeleteUserMutation");
const { UpdateUserMutation } = require("./mutation/UpdateUserMutation");

const { RequestOrderStockists } = require("./query/RequestOrderStockists");
const { AddRequestOrder } = require("./mutation/AddRequestOrder");
const { IncomingRequestOrders } = require("./query/IncomingRequestOrders");
const { RequestOrders } = require("./query/RequestOrders");
const { UpdateRequestOrder } = require("./mutation/UpdateRequestOrder");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    authenticateUser: AuthenticateUserQuery,
    users: UsersQuery,
    stockists: StockistsQuery,
    products: ProductsQuery,
    activeResellers: ActiveResellersQuery,
    yourOrders: YourOrdersQuery,
    userInfo: UserInfoQuery,
    requestOrderStockists: RequestOrderStockists,
    requestOrders: RequestOrders,
    incomingRequestOrders: IncomingRequestOrders,
  }),
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    userCreate: UserCreate,
    changeUserStatus: ChangeUserStatus,
    addOrder: AddOrderMutation,
    updateOrder: UpdateOrderMutation,
    createOrder: CreateOrderMutation,
    createProduct: CreateProductMutation,
    updateOrderNote: UpdateOrderNoteMutation,
    updateProduct: UpdateProductMutation,
    updateResellerStock: UpdateResellerStockMutation,
    deleteProduct: DeleteProductMutation,
    deleteUser: DeleteUserMutation,
    updateUser: UpdateUserMutation,
    addRequestOrder: AddRequestOrder,
    updateRequestOrder: UpdateRequestOrder,
  }),
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = schema;
