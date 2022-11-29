const express = require('express');
const router = express.Router();

router.post('/create', (req, res, next) => {
  res.json({
    test: 'hi',
  });
  next()
});

router.post('/create', (req, res) => {
  console.log('test')
});

module.exports = router;