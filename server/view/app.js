const express = require("express");
const database = require("../model/database")
const services = require("../controller/services")

const app = express();

// middlewares
app.use(express.json());

// access code
app.post("/api/create_access_code", (req, res) => {
  function check(req_data) {
    if (true) {
      return true
    } else {
      return false
    }
  }
  if (check(req_data = req.body)) {
    res.send({
      "status": 200
    });
  } else {
    res.send({
      "status": 403
    });
  }
});

app.post("/api/get_loc", (req, res) => {
  function check(req_data) {
    if (true) {
      return true
    } else {
      return false
    }
  }
  if (check(req_data = req.body)) {
    res.send({
      "status": 200,
      "username": "",
      "location": "hash"
    });

  } else {
    res.send({ "status": 403 });
  }

});

app.post("/api/create_account", (req, res) => {
  const req_data = req.body
  console.log(req_data)
  const username = req_data['username'];
  const password = req_data['password'];
  const user_query = {
    username: username,
  }
  const account_query = {
    username: username,
    password: password
  }

  database.find_user(user_query).then(
    (result) => {
      const my_data = result;
      console.log(my_data)
      console.log(`length: ${my_data.length}`)
      if (my_data.length == 1) {
        res.send(
          { 'status': 403 }
        )
      } else {
        database.create_user(account_query)
        res.send(
          {
            'status': 200,
            'message': 'account created successfully',
            'token': services.token_generator(account_query['username'], account_query['password'])
          }
        )
      }
    }
  )
})

app.post("/api/update_my_loc", (req, res) =>{
  const data = {
    username: res.body['username'],
    token: res.body['token'],  // verify
    location: res.body['location'] // location:{loc: xyz, time: aa.aa.aaaa hh.hh.hh}  => add this into the array
  }

  function verify(data){

  }
})









// run
app.listen(5000, () => {
  console.log("Server is working on => localhost:5000 ");
});
