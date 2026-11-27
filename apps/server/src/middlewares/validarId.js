
function validarId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0 || id > 2_147_483_647) {
        return res.status(400).json({
            erro: "O ID informado é inválido. Informe um número inteiro positivo."
        });
    }

    next();
}

module.exports = validarId;
