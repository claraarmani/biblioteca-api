
const express = require('express');
const router = express.Router();

const {
    cadastrarUsuario,
    fazerLogin,
    buscarMeuPerfil,
    atualizarMeuPerfil
} = require('../controllers/usuarioController');

const autenticarUsuario = require('../middlewares/autenticarUsuario');

// Cadastrar usuário
router.post('/usuarios', cadastrarUsuario);

// Fazer login
router.post('/login', fazerLogin);

// Buscar dados do usuário autenticado
router.get('/usuarios/perfil', autenticarUsuario, buscarMeuPerfil);

// Atualizar dados do usuário autenticado
router.put('/usuarios/perfil', autenticarUsuario, atualizarMeuPerfil);

module.exports = router;
