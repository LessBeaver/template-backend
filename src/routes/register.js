const router = require('express').Router();
const util = require('util');
const bcrypt = require('bcrypt');

const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

const saltRounds = 10;

router.post('/admin', async (req, res) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const inscData = {
    ...req.body,
    password: hash,
  };
  try {
    const { email } = req.body;
    const users = await queryAsync('SELECT * FROM Admin WHERE email = ?', email);
    if (users[0]) {
      return res.status(409).json({
        status: 'error',
        errorMessage: "L'utilisateur existe déjà",
      });
    }
    const query = 'INSERT INTO Admin SET ?';
    const result = await queryAsync(query, inscData);
    return res.status(201).json({
      id_admin: result.insertId,
      ...inscData,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      errorMessage: 'Problème lors de la création du compte',
    });
  }
});

router.post('/user', async (req, res) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const inscData = {
      ...req.body,
      password: hash,
    };
    try {
      const { username } = req.body;
      const users = await queryAsync('SELECT * FROM User WHERE username = ?', username);
      if (users[0]) {
        return res.status(409).json({
          status: 'error',
          errorMessage: "L'utilisateur existe déjà",
        });
      }
      const query = 'INSERT INTO User SET ?';
      const result = await queryAsync(query, inscData);
      return res.status(201).json({
        id_user: result.insertId,
        ...inscData,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        errorMessage: 'Problème lors de la création du compte',
      });
    }
});

module.exports = router;
