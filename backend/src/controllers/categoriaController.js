
const prisma = require('../prisma');

// Cadastrar categoria
async function criarCategoria(req, res) {
    try {
        const { nome } = req.body;

        const categoria = await prisma.categoria.create({
            data: { nome }
        });

        return res.status(201).json(categoria);
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao cadastrar categoria."
        });
    }
}

// Listar categorias
async function listarCategorias(req, res) {
    try {
        const categorias = await prisma.categoria.findMany({
            include: {
                produtos: true
            }
        });

        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao listar categorias."
        });
    }
}

// Buscar categoria por ID
async function buscarCategoriaPorId(req, res) {
    try {
        const id = Number(req.params.id);

        const categoria = await prisma.categoria.findUnique({
            where: { id },
            include: {
                produtos: true
            }
        });

        if (!categoria) {
            return res.status(404).json({
                erro: "Categoria não encontrada."
            });
        }

        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao buscar categoria."
        });
    }
}

// Atualizar categoria
async function atualizarCategoria(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome } = req.body;

        const categoria = await prisma.categoria.update({
            where: { id },
            data: { nome }
        });

        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao atualizar categoria."
        });
    }
}

// Excluir categoria
async function apagarCategoria(req, res) {
    try {
        const id = Number(req.params.id);

        await prisma.categoria.delete({
            where: { id }
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            erro: "Erro ao excluir categoria."
        });
    }
}

module.exports = {
    criarCategoria,
    listarCategorias,
    buscarCategoriaPorId,
    atualizarCategoria,
    apagarCategoria
};
