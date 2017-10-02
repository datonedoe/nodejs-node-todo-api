const {ObjectID} = require("mongodb");
const { mongoose} = require('./../server/db/mongoose');
const {Todo} = require("./../server/models/todo");
const {User} = require('./../server/models/user');
// var id = '59d0b60759412c5618e3b1fd1'; //59d0b60759412c5618e3b1fd

//
// if (!ObjectID.isValid(id)) {
//   console.log("ID not valid");
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// })
//

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log("Todo by Id", todo);
// }).catch((e) => console.log(e))

User.findById("59d0650df47c8a7838345876").then((user) => {
  if(!user) {
    return console.log("Unable to find user");
  }
  console.log(JSON.stringify(user, undefined, 3))
}, (e) => {
  console.log("Error", e);
})
