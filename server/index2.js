const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let dbUser = process.env.dbUserName;
let dbPassword = process.env.dbPassword;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vhobs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const collection = client.db('EntertainmentToDoList').collection('Games');
  // perform actions on the collection object
  if (err) return console.error(err);
  else console.log('DB connected');

  //get everything in database
  app.get('/', async (req, res) => {
    console.log('I got a DB respnose');
    const posts = await collection;
    res.send(await posts.find({}).toArray());
  });

  //add to database
  app.post('/', async (req, res) => {
    console.log('request made');
    const posts = await collection;
    await posts.insertOne({
      name: req.body.name,
      completed: req.body.completed,
      date: new Date(),
    });
    res.status(201).send('Added to DB');
  });

  //delete id from database
  app.delete('/:id', async (req, res) => {
    const posts = await collection;
    await posts.deleteOne({ _id: ObjectId(`${req.params.id}`) });
    res.status(200).send('deleted');
  });

  //client.close();
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
