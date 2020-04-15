const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./graphql/schema");
const printSchemaFromBuild = require("./config/printSchema");
const middleware = require("./middleware");
const { setupDB } = require("./config/databaseConnection");
const { upload } = require("./config/photoSaving");
const PhotoService = require("./services/photoService");
const app = express();

setupDB((v) => console.log(v));
app.use("/public", express.static("public"));
app.use(cors());

app.post("/upload", upload.single("image"), async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const imageURL = url + "/public/" + req.file.filename;

  const photoService = new PhotoService();
  const result = await photoService.insert({
    imageURL,
    username: req.body.username,
  });

  return res.send(result);
});

app.use(middleware.checkToken);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  })
);

app.listen(4000);
console.log("SERVER OK");
printSchemaFromBuild(schema);
