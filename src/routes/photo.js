const express = require('express');

const router = express.Router();

const connection = require('../../db');

router.post('/', (req, res) => {
    const { body } = req;
    const { id_photo: idPhoto } = req.params;
    try {
      const query = 'INSERT INTO Photo SET ?, id_photo=?';
      connection.query(query, [body, idPhoto], (error, results) => {
        if (error) {
          res.status(500).json({
            status: error,
            errorMessage: 'Our server encountered an error performing the request',
          });
        } else {
          connection.query(
            `SELECT * FROM Photo WHERE id_photo=${results.insertId}`, (err, tripObj) => {
              if (err) {
                res.status(500).json({
                  status: err,
                  errorMessage: 'Our server encountered an error',
                });
              } else {
                res.status(201).json(tripObj[0]);
              }
            },
          );
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        errorMessage: 'Catch, Our server encountered an error',
      });
    }
});

router.get('/', (req, res) => {
  connection.query('SELECT * FROM Photo', (error, results) => {
    res.status(200).json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    connection.query(
      'SELECT * FROM Photo WHERE `id_photo`= ?',
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

router.get('/:idTrip', (req, res) => {
  const { idTrip } = req.params;
  const query = 'SELECT * FROM Photo WHERE Photo.id_trip = ?';
  try {
    connection.query(query, [idTrip], (error, results) => {
      if (error) {
        res.status(500).json({
          status: 'error',
          errorMessage: 'Our server encountered an error performing the request',
        });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: 'Our server encountered an error',
    });
  }
});

router.put('/:id', (req, res) => {
  const { body: formData } = req;
  const idPhoto = req.params.id;
  try {
    const query = 'UPDATE Photo SET ? WHERE `id_photo` = ?';
    connection.query(query, [formData, idPhoto], (error) => {
      if (error) {
        res.status(500).json({
          error: 'error',
          sql: 'Our server encountered an error performing the request',
        });
      } else {
        connection.query('SELECT * FROM Photo WHERE id_photo = ?', idPhoto, (err, trip) => {
          if (err) {
            res.status(404);
          } else {
            res.status(200).json(trip[0]);
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
    connection.query('DELETE FROM Photo WHERE `id_photo`= ?', id, (err, results) => {
      if (err) {
        res.sendStatus(500).json({
          status: 'error',
          errorMessage: 'Our server encountered an error performing the request',
        });
      } else if (results.affectedRows === 0) {
        res.status(404).json({
          status: 'error',
          errorMessage: 'Aucune photo avec cet id',
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
