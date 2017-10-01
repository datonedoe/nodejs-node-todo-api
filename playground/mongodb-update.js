
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log("Connected to MongoDB server");

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59d04c869de10a4b26215c11')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  //EXERCISE
  //findOneAndUpdate
  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID('59d0518e9de10a4b26215d85')
  // }, {
  //   $set: {
  //     name: 'Andrew'
  //   },
  //   $inc: {
  //     age: 1
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  // db.close();
});
