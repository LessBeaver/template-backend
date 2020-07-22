const router = require('express').Router();
const bcrypt = require('bcrypt');
const util = require('util');
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

router.post('/admin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await queryAsync('SELECT * FROM Admin WHERE email = ?', email);
    if (!users) {
      return res.status(500).json({
        status: 'error',
        errorMessage: 'Données invalides 1',
      });
    }
    const checkPass = bcrypt.compareSync(password, users[0].password);
    delete users[0].password;
    if (checkPass) {
      return res.status(200).json({
        ...users[0],
      });
    }
    return res.status(500).json({
      status: 'error',
      errorMessage: 'Données invalides 2',
    });
  } catch (err) {
    return res.status(500).json({
      status: err,
      errorMessage: 'Problème lors de la connexion',
    });
  }
});

router.post('/user', async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await queryAsync('SELECT * FROM User WHERE username = ?', username);
    if (!users) {
      return res.status(500).json({
        status: 'error',
        errorMessage: 'Données invalides 1',
      });
    }
    const checkPass = bcrypt.compareSync(password, users[0].password);
    delete users[0].password;
    if (checkPass) {
      return res.status(200).json({
        ...users[0],
      });
    }
    return res.status(500).json({
      status: 'error',
      errorMessage: 'Données invalides 2',
    });
  } catch (err) {
    return res.status(500).json({
      status: err,
      errorMessage: 'Problème lors de la connexion',
    });
  }
});

module.exports = router;
