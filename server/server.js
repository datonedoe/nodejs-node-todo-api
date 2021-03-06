require('./config/config');

var port=process.env.PORT;

const _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require("./middleware/authenticate");
const {ObjectID} = require("mongodb");
const app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


//
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/12342341
app.get('/todos/:id', authenticate, (req, res) => {
  var id= req.params.id;

  // Valid id using isValid
  if (!ObjectID.isValid(id)){
    // 404 - send back empty send
    return res.status(404).send();
  }

    // findById
    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
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
app.delete('/todos/:id', authenticate, (req, res) => {
  //get the id
  var id= req.params.id;
  // console.log(id);

  //validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);

   //validate the id -> not valid? return 404
   if (!ObjectID.isValid(id)){
     return res.status(404).send();
   }

   if (_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
   } else {
     body.completed= false;
     body.completedAt=null;
   }

   //findOneAndUpdate
   Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo)=> {
     if( !todo) {
       return res.status(404).send();
     }

     res.send({todo});
   }).catch((e) => {
     res.status(400).send();
   })

});

// POST /users
app.post("/users", (req, res) => {
  console.log('/users')
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.generateAuthToken

  user
    .save()
    .then(() => {
    return user.generateAuthToken();
  })
    .then((token) =>{
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    })
})


// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})

// POST /users/login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).json({error: e});
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})


app.listen( port, () => {
  console.log(`Server started at ${port}...`);
});

module.exports = { app };
