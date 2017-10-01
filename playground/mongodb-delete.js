
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log("Connected to MongoDB server");

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //EXERCISE
  //deleteOne
  // db.collection('Users').deleteOne({_id: "59cf67669fd40a3368b9d796"}).then((result) => {
  //   console.log(result);
  // });

  //deleteMany
  // db.collection('Users').deleteMany({name: 'Darwin'}).then((result) => {
  //   console.log(result);
  // })

  //findOneAndDelete
  // db.collection('Users').findOneAndDelete({name: 'Andrew'}).then((result) => {
  //   console.log(result);
  // });

  // db.close();
});
