var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Produto' });
});

/* GET home page. */
router.get('/tenis', function(req, res, next) {
  res.render('index', { title: 'Você está na rota tenis' });
});

module.exports = router;