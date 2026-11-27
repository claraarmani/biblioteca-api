
const express = require('express');
const router = express.Router();

const validarId = require('../middlewares/validarId');
const produtoController = require('../controllers/produtoController');

// Cadastrar produto
router.post(
    '/produtos',
    produtoController.criarProduto
);

// Listar produtos
router.get(
    '/produtos',
    produtoController.listarProdutos
);

// Buscar produto por ID
router.get(
    '/produtos/:id',
    validarId,
    produtoController.buscarProdutoPorId
);

// Atualizar produto
router.put(
    '/produtos/:id',
    validarId,
    produtoController.atualizarProduto
);

// Excluir produto
router.delete(
    '/produtos/:id',
    validarId,
    produtoController.apagarProduto
);

module.exports = router;
