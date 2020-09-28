/*******
* app.js file - root
********/ 

const express = require('express');
const dotEnv = require('dotenv');
const { handleError } = require('./util/ErrorHandler');
const connectMongoDB = require('./config/db');
var bodyParser = require('body-parser');

//Get all .env informations ( settings )
dotEnv.config();
const app = express();
const port = process.env.PORT;
const baseURL = process.env.BASE_URL;
const apiRoot = process.env.API_ROOT;

//Connect to db
connectMongoDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(apiRoot, require('./routes'));

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`RestFul listening on ${baseURL}:${port}${apiRoot}`
  );
});
