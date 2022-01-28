const express = require('express');

const db = require('./db/db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
