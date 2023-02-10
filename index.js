const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');


const DB_URL = "mongodb+srv://admin:mSaVR10mRtgaJVif@cluster0.wyjvgsa.mongodb.net";
const DB_NAME = "ocean-bancodados";

async function main () {

  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection("itens");

  const app = express();

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  app.get("/oi", function (req, res) {
    res.send("Ola, mundo!");
  });

  app.use(express.json());

  const itens = [
    "Naruto",
    "Kushina",
    "Minato"

  ];

  app.get("/item", async function (req, res) {
    const documentos = await collection.find().toArray();
    res.send(documentos);
  });

  app.get("/item/:id", async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({_id: new ObjectId(id)});
    res.send(item);
  });

  app.post("/item", async function (req, res) {
    const item = req.body;
     await collection.insertOne(item);
    res.send(item);
  });

app.put("/item/:id",  async function(req, res){
  const id = req.params.id;
  const body = req.body;

  await collection.updateOne(
    {_id: new ObjectId(id)},
    {$set: body}
  );

  res.send(body)
})

  app.listen(3000)
}

main();