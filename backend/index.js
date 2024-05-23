const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb://localhost:27017/DoDawn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userschema = new mongoose.Schema({
  name: String,
  age: Number
});

const usermodel = mongoose.model("students", userschema);

app.get("/getusers", (req, res) => {
  usermodel.find({})
    .then(function(students) {
      res.json(students); // Changed 'users' to 'students'
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send("Error retrieving users");
    });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
