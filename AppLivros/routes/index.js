var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  const posts = [
    {
      titulo: "Por que ler os clássicos?",
      data: "15 de Março, 2026",
      resumo: "Machado de Assis continua sendo o maior nome da nossa literatura. Mas por onde começar?",
      categoria: "Dicas de Leitura"
    },
    {
      titulo: "O fenômeno das distopias modernas",
      data: "10 de Março, 2026",
      resumo: "De 1984 até os dias atuais: o que nos atrai tanto em futuros assustadores?",
      categoria: "Análise"
    }
  ];
  res.render('index', { posts: posts, title: 'Diário do Leitor' });
});
module.exports = router;
