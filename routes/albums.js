const express = require('express');

const router = express.Router();
const passport = require('passport');
const { Album } = require('../models/albums');

router.get('/:AlbumId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Album.findOne({ AlbumId: parseInt(req.params.AlbumId) }, (error, album) => {
    if (error) {
      res.status(404).json({
        message: ({ message: 'Unable to find Album' }),
      });
    } else {
      res.status(200).json(album);
    }
  });
});

module.exports = router;
