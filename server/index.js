const express = require('express');
const cors = require('cors');
const { mongodb, ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let dbUser = process.env.dbUserName;
let dbPassword = process.env.dbPassword;

//get everything in database
app.get('/list', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//add to database
app.post('/list', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    name: req.body.name,
    completed: false,
    date: new Date(),
  });
  res.status(201).send('Added to DB');
  console.log(`added ${req.body.name}`);
});

//update id from database
app.put('/list/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.updateOne(
    {
      _id: ObjectId(`${req.body.id}`),
    },
    {
      $set: {
        completed: req.body.completed,
      },
    }
  );
  res.status(200).send('updated');
  console.log(`updated ${req.body.id} to ${req.body.completed}`);
});

//delete id from database
app.delete('/list/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: ObjectId(`${req.params.id}`) });
  res.status(200).send('deleted');
});

async function loadPostsCollection() {
  const client = await MongoClient.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vhobs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return client.db('EntertainmentToDoList').collection('Games');
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
