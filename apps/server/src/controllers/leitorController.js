const { prisma } = require('@bibapi/storage');

async function cadastrarLeitor(req, res) {
    const { nome, email, turma } = req.body || {};
    if (![nome, email, turma].every(valor => typeof valor === 'string' && valor.trim())) {
        return res.status(400).json({ erro: 'Informe o nome, o e-mail e a turma.' });
    }

    try {
        const leitor = await prisma.leitor.create({
            data: {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                turma: turma.trim()
            }
        });
        return res.status(201).json(leitor);
    } catch (erro) {
        if (erro.code === 'P2002') {
            return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao cadastrar leitor.' });
    }
}

module.exports = { cadastrarLeitor };
