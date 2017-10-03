var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require("mongodb");
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


//
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/12342341
app.get('/todos/:id', (req, res) => {
  var id= req.params.id;

  // Valid id using isValid
  if (!ObjectID.isValid(id)){
    // 404 - send back empty send
    return res.status(404).send();
  }

    // findById
    Todo.findById(id).then((todo) => {
      //success
      if(!todo) {
        res.status(404).send();
      }
      res.send({todo});
        // if todo -send it back
        // if no todo - send back 404 with empty body
      //Error
        //400 - and send empty body back
    }).catch((e) => {
      res.status(400).send();
    })
});


// DELETE ROUTE
app.delete('/todos/:id', (req, res) => {
  //get the id
  var id= req.params.id;
  // console.log(id);

  //validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    //success
      // if no doc, send 404
      if (!todo){
        return res.status(404).send();
      } else {
        // if yes doc, send doc back with 200
        res.send({todo});
      }
  }).catch((e) => {
    //Error
      // 400 with empry body
      return res.status(400).send();
  });




});

var port=process.env.PORT || 3000;
app.listen( port, () => {
  console.log(`Server started at${port}...`);
});

module.exports = { app };
