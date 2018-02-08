const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectToDB = require('./db');
const api = require('./api');

const port = process.env.port || 3000;
const app = express();

connectToDB();

app.use(bodyParser.json());
app.use(api);

app.listen(port, () => console.log(`Idea Jar running on port ${port}`));
