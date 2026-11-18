const express = require('express');
const router = express.Router();

const emprestimoController = require('../controllers/emprestimoController');

const validarId = require('../middlewares/validarId');
const validarDados = require('../middlewares/validarDados');

// Criar empréstimo
router.post(
    '/emprestimos',
    validarDados,
    emprestimoController.criarEmprestimo
);

// Listar todos os empréstimos
router.get(
    '/emprestimos',
    emprestimoController.listarEmprestimos
);

// Buscar empréstimo por ID
router.get(
    '/emprestimos/:id',
    validarId,
    emprestimoController.buscarEmprestimoPorId
);

// Atualizar empréstimo
router.put(
    '/emprestimos/:id',
    validarId,
    validarDados,
    emprestimoController.atualizarEmprestimo
);

// Apagar empréstimo
router.delete(
    '/emprestimos/:id',
    validarId,
    emprestimoController.apagarEmprestimo
);

module.exports = router;
