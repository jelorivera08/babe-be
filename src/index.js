const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./graphql/schema");
const printSchemaFromBuild = require("./config/printSchema");
const middleware = require("./middleware");
const { setupDB } = require("./config/databaseConnection");
const app = express();
const multer = require("multer");
const uploadImage = require("./helpers/cloudStorage");
const PhotoService = require("./services/photoService");

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

setupDB((v) => console.log(v));
app.use(multerMid.single("file"));
app.use("/public", express.static("public"));
app.use(cors());

app.post("/upload", async (req, res, next) => {
  try {
    const { username } = req.body;
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile, username);

    const photoService = new PhotoService();
    const result = await photoService.insert({
      imageUrl,
      username: req.body.username,
    });

    return res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
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

app.listen(8080);
console.log("SERVER OK");
printSchemaFromBuild(schema);
