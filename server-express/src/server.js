require('dotenv').config();
const express = require("express");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const { callSpoonacular } = require('../services/api/spoonnacular');
// const demoData = require('../services/api/demo-data');
const { data } = require('../services/api/demo-data');


// serve static files from ../build (needed for React)
const cwd = process.cwd();
const public = path.join(cwd, '..', 'public');
console.log("public dir: ", public);
app.use(express.static(public));

// Do Not make a route for "/" or it will override public

app.get("/api/status", (req, res) => {


  // callSpoonacular().then((data) => {
    
  // })
  console.log(data.results);
  res.json({version: "1.01", results:data.results});
});

app.use(function(req, res) {
  res.status(404);
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});