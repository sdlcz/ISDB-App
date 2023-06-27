const express = require('express');

const router = express.Router();
const passport = require('passport');
const { Artist } = require('../models/artists');

router.get('/:ArtistId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Artist.findOne({ ArtistId: parseInt(req.params.ArtistId) }, (error, artist) => {
    if (error) {
      res.status(404).json({
        message: ({ message: 'Unable to find Artist' }),
      });
    } else {
      res.status(200).json(artist);
    }
  });
});

module.exports = router;
