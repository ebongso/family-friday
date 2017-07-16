const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // let jsonData = { test : 'test' };
  // res.json(jsonData);

  res.render('index.html');
});

module.exports = router;