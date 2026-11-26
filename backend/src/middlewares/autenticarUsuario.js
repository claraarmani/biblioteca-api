
const jwt = require('jsonwebtoken');

function autenticarUsuario(req, res, next) {
    try {
        const cabecalho = req.headers.authorization;

        if (!cabecalho || !cabecalho.startsWith('Bearer ')) {
            return res.status(401).json({
                erro: 'Token de autenticação não informado.'
            });
        }

        const token = cabecalho.split(' ')[1];

        const dadosToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuarioId = dadosToken.id;

        next();

    } catch (error) {
        return res.status(401).json({
            erro: 'Token inválido ou expirado.'
        });
    }
}

module.exports = autenticarUsuario;
