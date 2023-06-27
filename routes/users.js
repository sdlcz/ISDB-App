const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models/users');

const jwtOptions = {
  secretOrKey: 'a@s!k#',
};

router.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }, (error, user) => {
      if (user) {
        user.authenticate(req.body.password, (error, user) => {
          if (error) {
            res.status(401).json({ message: 'Invalid username or password' });
          } else {
            const token = jwt.sign({ username: user.username }, jwtOptions.secretOrKey);
            res.status(200).json({ message: `Hello, ${user.username}`, token });
          }
        });
      } else {
        res.status(401).json({ message: 'invalid username or password' });
      }
    });
  } else {
    res.status(401).json({ message: 'missing username or password' });
  }
});

router.post('/register', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }, (error, user) => {
      if (error) {
        res.status(401).json(error);
      } else if (user) {
        res.status(401).json({ message: 'Username unavailable' });
      } else {
        const newUser = new User({ username: req.body.username });

        User.register(
          newUser,
          req.body.password,
          (error) => {
            if (error) { res.status(401).json(error); } else {
              res.status(201).json({ message: 'Registered' });
            }
          },
        );
      }
    });
  } else {
    res.status(401).json({ message: 'Enter username and password' });
  }
});

module.exports = router;
