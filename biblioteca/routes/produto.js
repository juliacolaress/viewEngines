var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// Caminho para o arquivo JSON (sobe um nível de routes para a raiz)
const jsonPath = path.join(__dirname, '../livros.json');

// Helper: Lê do arquivo
const lerArquivo = () => JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
// Helper: Salva no arquivo
const escreverArquivo = (dados) => fs.writeFileSync(jsonPath, JSON.stringify(dados, null, 2));

/* Rota Principal com Busca */
router.get('/', function(req, res) {
  let biblioteca = lerArquivo();
  const busca = req.query.q;

  if (busca) {
    biblioteca = biblioteca.filter(l => 
      l.titulo.toLowerCase().includes(busca.toLowerCase()) || 
      l.autor.toLowerCase().includes(busca.toLowerCase())
    );
  }
  res.render('index', { title: 'Biblioteca', livros: biblioteca, busca: busca });
});

/* Tela de Formulário */
router.get('/retirar/:id', function(req, res) {
  const biblioteca = lerArquivo();
  const livro = biblioteca.find(l => l.id == req.params.id);
  res.render('agendamentos', { livro: livro });
});

/* Confirmar no JSON e redirecionar */
router.post('/confirmar', function(req, res) {
  const { id, nome } = req.body;
  let biblioteca = lerArquivo();
  const livro = biblioteca.find(l => l.id == id);

  if (livro && livro.disponivel) {
    livro.disponivel = false;
    escreverArquivo(biblioteca);

    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + 7);

    res.render('sucesso', { 
      usuario: nome, 
      item: livro.titulo, 
      prazo: dataDevolucao.toLocaleDateString('pt-BR') 
    });
  } else {
    res.redirect('/produto');
  }
});
/* Rota para Devolver o Livro - GET /produto/devolver/:id */
router.get('/devolver/:id', function(req, res) {
  let biblioteca = lerArquivo();
  const livro = biblioteca.find(l => l.id == req.params.id);

  if (livro) {
    livro.disponivel = true; // Torna o livro disponível novamente
    escreverArquivo(biblioteca); // Salva a mudança no JSON
  }
  
  res.redirect('/produto'); // Volta para a lista atualizada
});

module.exports = router;