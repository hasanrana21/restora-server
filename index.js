const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h7tlf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const foodsCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection(`${process.env.DB_COLLECTION1}`);
  // perform actions on the collection object

  // Foods Post API
  app.post("/foods", (req, res) => {
    const foodObj = req.body;
    foodsCollection.insertOne(foodObj).then((data) => {
      res.send(data.insertedCount > 0);
    });
  });

  // Foods Post API
  app.get("/get-all-foods", (req, res) => {
    foodsCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
});

// Testing Message in the root
app.get("/", (req, res) => {
  res.send("Hello World! Welcome to Restora Server");
});

app.listen(3000);
