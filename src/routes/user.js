const express = require('express');

const router = express.Router();

const connection = require('../../db');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM User', (error, results) => {
    res.status(200).json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    connection.query(
      'SELECT * from User WHERE `id_user`= ?',
      id,
      (error, results) => {
        if (error) {
          res.status(404).json({
            status: 'error',
            errorMessage: 'Our server encountered an error performing the request',
          });
        } else {
          res.status(200).json(results[0]);
        }
      },
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: 'Our server encountered an error',
    });
  }
});

router.put('/:id', (req, res) => {
  const { body: formData } = req;
  const idUser = req.params.id;
  try {
    const query = 'UPDATE User SET ? WHERE `id_user` = ?';
    connection.query(query, [formData, idUser], (error) => {
      if (error) {
        res.status(500).json({
          error: 'error',
          sql: 'Our server encountered an error performing the request',
        });
      } else {
        connection.query('SELECT * FROM User WHERE id_user = ?', idUser, (err, user) => {
          if (err) {
            res.status(404);
          } else {
            res.status(200).json(user[0]);
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: 'Our server encountered an error',
    });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    connection.query('DELETE FROM User WHERE `id_user`= ?', id, (err, results) => {
      if (err) {
        res.sendStatus(500).json({
          status: 'error',
          errorMessage: 'Our server encountered an error performing the request',
        });
      } else if (results.affectedRows === 0) {
        res.status(404).json({
          status: 'error',
          errorMessage: 'Aucun utilisateur avec cet id',
        });
      } else {
        res.sendStatus(204);
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: 'Problème lors de la suppression du compte',
    });
  }
});

module.exports = router;
