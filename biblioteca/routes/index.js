var express = require('express');
var router = express.Router();

// Banco de dados simulado de livros
let livros = [
    { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', disponivel: true, categoria: 'Clássico' },
    { id: 2, titulo: '1984', autor: 'George Orwell', disponivel: false, categoria: 'Distopia' },
    { id: 3, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', disponivel: true, categoria: 'Fantasia' },
    { id: 4, titulo: 'O Alquimista', autor: 'Paulo Coelho', disponivel: true, categoria: 'Autoajuda' },
];

/* Listagem de Livros */
router.get('/', function(req, res) {
    res.render('index', { 
        titulo: 'Biblioteca Digital', 
        livros: livros 
    });
});

/* Página de Solicitação de Empréstimo */
router.get('/emprestimo/:id', function(req, res) {
    const livro = livros.find(l => l.id == req.params.id);
    res.render('agendamentos', { 
        titulo: 'Solicitar Empréstimo', 
        livro: livro 
    });
});

/* Confirmar Empréstimo */
router.post('/confirmar', function(req, res) {
    const { id, nome } = req.body;
    const livro = livros.find(l => l.id == id);
    
    if (livro) {
        livro.disponivel = false; // Marca como emprestado
    }

    res.render('sucesso', { 
        titulo: 'Empréstimo Confirmado',
        usuario: nome,
        item: livro.titulo
    });
});

module.exports = router;