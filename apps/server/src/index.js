const express = require('express');
const cors = require('cors');

const emprestimoRoutes = require('./routes/emprestimoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const porta = Number(process.env.PORT || 3000);

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3001' }));
app.use(express.json());

app.get('/status', (_req, res) => {
    res.json({ mensagem: 'API funcionando!', status: 'online' });
});

app.use(emprestimoRoutes);
app.use(categoriaRoutes);
app.use(produtoRoutes);
app.use(usuarioRoutes);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
