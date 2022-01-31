const express = require('express');
require('dotenv').config();

const connectMongo = require('./db');
const router = require('./routes/project');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

const port = process.env.NODE_LOCAL_PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectMongo();
});
