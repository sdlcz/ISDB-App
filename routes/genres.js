const express = require('express');

const router = express.Router();
const passport = require('passport');
const { Genre } = require('../models/genres');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Genre.find({}, (error, genres) => {
    if (error) {
      res.status(404).json({
        message: ({ message: 'Unable to find Genre' }),
      });
    } else {
      res.status(200).json(genres);
    }
  });
});

module.exports = router;
