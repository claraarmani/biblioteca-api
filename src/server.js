const express = require('express');
const emprestimoRoutes = require('./routes/emprestimoRoutes');
const logger = require('./middlewares/logger');

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(logger);

app.get('/status', (req, res) => {
    return res.json({
        status: "API Online - Projeto Semana 2"
    });
});

app.use(emprestimoRoutes);

app.listen(PORTA, () => {
    console.log(
        `[SERVIDOR OK] Rodando em http://localhost:${PORTA}`
    );
});
