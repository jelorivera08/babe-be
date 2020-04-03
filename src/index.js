const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./graphql/schema");
const printSchemaFromBuild = require("./config/printSchema");
const middleware = require("./middleware");

const { setupDB } = require("./config/databaseConnection");

const app = express();

setupDB(v => console.log(v));
app.use(cors());
app.use(middleware.checkToken);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true
  })
);

app.listen(4000);
console.log("SERVER OK");
printSchemaFromBuild(schema);
