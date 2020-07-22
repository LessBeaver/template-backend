const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.NODE_ENV === 'test' ? 4001 : 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = app.listen(PORT, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
