
function logger(req, res, next) {
    const data = new Date().toLocaleString('pt-BR');

    console.log(`[${data}] ${req.method} ${req.originalUrl}`);

    next();
}

module.exports = logger;
