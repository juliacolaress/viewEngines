var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sobre', function(req, res, next) {
  res.render('sobre', { title: 'Você está em Sobre nós!' });
});

module.exports = router;
