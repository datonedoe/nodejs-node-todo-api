const {ObjectID} = require("mongodb");

const { mongoose} = require('./../server/db/mongoose');
const {Todo} = require("./../server/models/todo");
const {User} = require('./../server/models/user');

//
// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//

// Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '59d336cc59b9aef4cd2363d2'}).then((todo)=>{
  console.log(todo);
})

Todo.findByIdAndRemove('59d336cc59b9aef4cd2363d2').then((todo) => {
  console.log(todo);
});
