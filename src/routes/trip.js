const express = require('express');

const router = express.Router();

const connection = require('../../db');

router.post('/', (req, res) => {
    const { body } = req;
    const { id_trip: idTrip } = req.params;
    try {
      const query = 'INSERT INTO Trip SET ?, id_trip=?';
      connection.query(query, [body, idTrip], (error, results) => {
        if (error) {
          res.status(500).json({
            status: error,
            errorMessage: 'Our server encountered an error performing the request',
          });
        } else {
          connection.query(
            `SELECT * FROM Trip WHERE id_trip=${results.insertId}`, (err, tripObj) => {
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
  connection.query('SELECT * FROM Trip', (error, results) => {
    res.status(200).json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    connection.query(
      'SELECT * FROM Trip WHERE `id_trip`= ?',
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
  const idTrip = req.params.id;
  try {
    const query = 'UPDATE Trip SET ? WHERE `id_trip` = ?';
    connection.query(query, [formData, idTrip], (error) => {
      if (error) {
        res.status(500).json({
          error: 'error',
          sql: 'Our server encountered an error performing the request',
        });
      } else {
        connection.query('SELECT * FROM Trip WHERE id_trip = ?', idTrip, (err, trip) => {
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
    connection.query('DELETE FROM Trip WHERE `id_trip`= ?', id, (err, results) => {
      if (err) {
        res.sendStatus(500).json({
          status: 'error',
          errorMessage: 'Our server encountered an error performing the request',
        });
      } else if (results.affectedRows === 0) {
        res.status(404).json({
          status: 'error',
          errorMessage: 'Aucun voyage avec cet id',
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
