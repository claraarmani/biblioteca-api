
const { prisma } = require('@bibapi/storage');

// 1. CREATE - Cadastrar Empréstimo
async function criarEmprestimo(req, res) {
    try {
        const { nomeLivro, leitorId } = req.body;

        const novoEmprestimo = await prisma.emprestimo.create({
            data: {
                nomeLivro: nomeLivro,
                leitorId: Number(leitorId)
            }
        });

        return res.status(201).json(novoEmprestimo);

    } catch (erro) {
        if (erro.code === 'P2003') {
            return res.status(404).json({ erro: 'Leitor não encontrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao criar empréstimo.' });
    }
}

// 2. READ - Listar Todos os Empréstimos
async function listarEmprestimos(req, res) {
    try {
        const emprestimos = await prisma.emprestimo.findMany({
            include: {
                leitor: true
            }
        });

        return res.status(200).json(emprestimos);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao listar empréstimos."
        });
    }
}

// 3. READ - Buscar Empréstimo por ID
async function buscarEmprestimoPorId(req, res) {
    try {
        const { id } = req.params;

        const emprestimo = await prisma.emprestimo.findUnique({
            where: { id: Number(id) },
            include: { leitor: true }
        });

        if (!emprestimo) {
            return res.status(404).json({
                erro: "Empréstimo não encontrado."
            });
        }

        return res.status(200).json(emprestimo);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao buscar empréstimo."
        });
    }
}

// 4. UPDATE - Atualizar Empréstimo
async function atualizarEmprestimo(req, res) {
    try {
        const { id } = req.params;
        const { nomeLivro, dataDevolucao } = req.body;

        const emprestimoAtualizado = await prisma.emprestimo.update({
            where: { id: Number(id) },
            data: {
                nomeLivro: nomeLivro,
                ...(dataDevolucao !== undefined && {
                    dataDevolucao: dataDevolucao === null ? null : new Date(dataDevolucao)
                })
            }
        });

        return res.status(200).json(emprestimoAtualizado);

    } catch (erro) {
        if (erro.code === 'P2025') {
            return res.status(404).json({ erro: 'Empréstimo não encontrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao atualizar empréstimo.' });
    }
}

// 5. DELETE - Excluir Empréstimo
async function apagarEmprestimo(req, res) {
    try {
        const { id } = req.params;

        await prisma.emprestimo.delete({
            where: { id: Number(id) }
        });

        return res.status(204).send();

    } catch (erro) {
        if (erro.code === 'P2025') {
            return res.status(404).json({ erro: 'Empréstimo não encontrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao excluir empréstimo.' });
    }
}

module.exports = {
    criarEmprestimo,
    listarEmprestimos,
    buscarEmprestimoPorId,
    atualizarEmprestimo,
    apagarEmprestimo
};
