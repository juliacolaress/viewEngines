var express = require('express');
var router = express.Router();

// 1. A lista agora fica FORA, no topo, para manter os dados "vivos"
let horarios = [
    { hora: '08:00', disponivel: true },
    { hora: '09:00', disponivel: false },
    { hora: '10:00', disponivel: true },
    { hora: '11:00', disponivel: true },
    { hora: '16:00', disponivel: true },
    { hora: '17:00', disponivel: false },
    { hora: '18:00', disponivel: true },
    { hora: '19:00', disponivel: true },
];

/* Página Principal */
router.get('/', function(req, res) {
    res.render('index', { 
        titulo: 'Arena Futevôlei', 
        horarios: horarios // Usa a variável global
    });
});

/* Página de Formulário */
router.get('/agendar/:horario', function(req, res) {
    const horarioSelecionado = req.params.horario;
    res.render('agendamentos', { 
        titulo: 'Confirmar Reserva', 
        horario: horarioSelecionado 
    });
});

/* Processar a Reserva e Marcar como Ocupado */
router.post('/confirmar', function(req, res) {
    const { nome, horario } = req.body;

    // 2. Lógica para achar o horário na lista e mudar para disponível: false
    const agenda = horarios.find(h => h.hora === horario);
    if (agenda) {
        agenda.disponivel = false;
    }

    res.render('sucesso', { 
        titulo: 'Reserva Confirmada!',
        nome: nome,
        horario: horario
    });
});

module.exports = router;
