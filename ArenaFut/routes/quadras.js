var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Você está em quadras!' });
});

router.get('/agendamentos', function(req, res, next) {
  res.render('agendamentos', { title: 'Você está em agendamentos!' });
});

module.exports = router;
