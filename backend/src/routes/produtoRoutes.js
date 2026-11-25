
const express = require('express');
const router = express.Router();

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
    produtoController.buscarProdutoPorId
);

// Atualizar produto
router.put(
    '/produtos/:id',
    produtoController.atualizarProduto
);

// Excluir produto
router.delete(
    '/produtos/:id',
    produtoController.apagarProduto
);

module.exports = router;
