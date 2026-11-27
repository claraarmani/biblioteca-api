
const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');
const validarId = require('../middlewares/validarId');

// Cadastrar categoria
router.post(
    '/categorias',
    categoriaController.criarCategoria
);

// Listar categorias
router.get(
    '/categorias',
    categoriaController.listarCategorias
);

// Buscar categoria por ID
router.get(
    '/categorias/:id',
    validarId,
    categoriaController.buscarCategoriaPorId
);

// Atualizar categoria
router.put(
    '/categorias/:id',
    validarId,
    categoriaController.atualizarCategoria
);

// Excluir categoria
router.delete(
    '/categorias/:id',
    validarId,
    categoriaController.apagarCategoria
);

module.exports = router;
