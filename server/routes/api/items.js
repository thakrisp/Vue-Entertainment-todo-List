const express = require('express');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

require('dotenv').config();

let dbUser = process.env.dbUserName;
let dbPassword = process.env.dbPassword;

//get everything in database
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//add to database
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
  const posts = await loadPostsCollection();

  try {
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
  } catch (err) {
    console.error(err);
  }
  res.status(200).send('updated');
  console.log(`updated ${req.body.id} to ${req.body.completed}`);
});

//delete id from database
router.delete('/:id', async (req, res) => {
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
  ).catch((err) => {
    console.error(err);
  });

  console.log('DB connected!');

  return client.db('EntertainmentToDoList').collection('Games');
}

module.exports = router;
