
const express = require('express');
const cors = require('cors');

const app = express();
const PORTA = 3000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(express.json());

// Importação das rotas
const emprestimoRoutes = require('./routes/emprestimoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

// Rotas principais
app.get('/status', (req, res) => {
    res.json({
        mensagem: 'API funcionando!',
        status: 'online'
    });
});

app.use(emprestimoRoutes);
app.use(categoriaRoutes);
app.use(produtoRoutes);

// Inicialização do servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
