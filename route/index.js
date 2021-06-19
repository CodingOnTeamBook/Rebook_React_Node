const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.send('dfsdf');
  res.status(404).send('Sorry not found!');
});

module.exports = router;