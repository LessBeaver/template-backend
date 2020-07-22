const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require('./routes/administrator');
const signin = require('./routes/signin');
const register = require('./routes/register');
const administrator = require('./routes/administrator');
const user = require('./routes/user');
const trip = require('./routes/trip');
const photo = require('./routes/photo');

const app = express();
const PORT = process.env.NODE_ENV === 'test' ? 4001 : 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/admin', admin);
app.use('/signin', signin);
app.use('/register', register);
app.use('/administrator', administrator);
app.use('/user', user);
app.use('/trip', trip);
app.use('/photo', photo);

const server = app.listen(PORT, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
