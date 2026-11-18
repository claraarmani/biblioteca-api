
function validarDados(req, res, next) {
    const dados = req.body;

    if (
        !dados ||
        typeof dados !== 'object' ||
        Array.isArray(dados) ||
        Object.keys(dados).length === 0
    ) {
        return res.status(400).json({
            erro: "Os dados enviados são inválidos ou estão vazios."
        });
    }

    // Validação para criação de empréstimo (POST)
    if (req.method === 'POST') {
        const { nomeLivro, leitorId } = dados;

        if (
            typeof nomeLivro !== 'string' ||
            nomeLivro.trim() === ''
        ) {
            return res.status(400).json({
                erro: "O nome do livro é obrigatório."
            });
        }

        if (
            !Number.isInteger(Number(leitorId)) ||
            Number(leitorId) <= 0
        ) {
            return res.status(400).json({
                erro: "O ID do leitor deve ser um número inteiro positivo."
            });
        }

        dados.nomeLivro = nomeLivro.trim();
        dados.leitorId = Number(leitorId);
    }

    // Validação para atualização de empréstimo (PUT)
    if (req.method === 'PUT') {
        const { nomeLivro, dataDevolucao } = dados;

        if (nomeLivro !== undefined) {
            if (
                typeof nomeLivro !== 'string' ||
                nomeLivro.trim() === ''
            ) {
                return res.status(400).json({
                    erro: "O nome do livro não pode estar vazio."
                });
            }

            dados.nomeLivro = nomeLivro.trim();
        }

        if (dataDevolucao !== undefined && dataDevolucao !== null) {
            if (isNaN(Date.parse(dataDevolucao))) {
                return res.status(400).json({
                    erro: "A data de devolução é inválida."
                });
            }
        }

        if (
            nomeLivro === undefined &&
            dataDevolucao === undefined
        ) {
            return res.status(400).json({
                erro: "Informe pelo menos um dado para atualizar."
            });
        }
    }

    next();
}

module.exports = validarDados;
