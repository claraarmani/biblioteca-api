
const { prisma } = require('@bibapi/storage');

// Cadastrar produto
async function criarProduto(req, res) {
    try {
        const {
            nome,
            descricao,
            preco,
            tamanho,
            cor,
            estoque,
            categoriaId,
            genero,
            imagem
        } = req.body || {};

        if (!nome || !preco || !tamanho || !cor || !categoriaId || !genero) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios."
            });
        }

        if (!['homem', 'mulher'].includes(genero)) {
            return res.status(400).json({
                erro: "O gênero deve ser homem ou mulher."
            });
        }

        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao: descricao || null,
                preco: Number(preco),
                tamanho,
                cor,
                estoque: Number(estoque),
                categoriaId: Number(categoriaId),
                genero,
                imagem: imagem || null
            },
            include: {
                categoria: true
            }
        });

        return res.status(201).json(produto);

    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(404).json({ erro: 'Categoria não encontrada.' });
        }
        console.error("Erro ao cadastrar produto:", error);

        return res.status(500).json({
            erro: "Erro ao cadastrar produto."
        });
    }
}

// Listar todos os produtos
async function listarProdutos(req, res) {
    try {
        const produtos = await prisma.produto.findMany({
            include: {
                categoria: true
            }
        });

        return res.status(200).json(produtos);

    } catch (error) {
        console.error("Erro ao listar produtos:", error);

        return res.status(500).json({
            erro: "Erro ao listar produtos."
        });
    }
}

// Buscar produto por ID
async function buscarProdutoPorId(req, res) {
    try {
        const id = Number(req.params.id);

        const produto = await prisma.produto.findUnique({
            where: { id },
            include: {
                categoria: true
            }
        });

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        return res.status(200).json(produto);

    } catch (error) {
        console.error("Erro ao buscar produto:", error);

        return res.status(500).json({
            erro: "Erro ao buscar produto."
        });
    }
}

// Atualizar produto
async function atualizarProduto(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome, descricao, preco, tamanho, cor, estoque, categoriaId, genero, imagem } = req.body || {};
        const dados = { nome, descricao, preco, tamanho, cor, estoque, categoriaId, genero, imagem };

        if (dados.genero !== undefined &&
            !['homem', 'mulher'].includes(dados.genero)) {
            return res.status(400).json({
                erro: "O gênero deve ser homem ou mulher."
            });
        }

        if (dados.preco !== undefined) {
            dados.preco = Number(dados.preco);
        }

        if (dados.estoque !== undefined) {
            dados.estoque = Number(dados.estoque);
        }

        if (dados.categoriaId !== undefined) {
            dados.categoriaId = Number(dados.categoriaId);
        }

        const produto = await prisma.produto.update({
            where: { id },
            data: dados,
            include: {
                categoria: true
            }
        });

        return res.status(200).json(produto);

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }
        if (error.code === 'P2003') {
            return res.status(404).json({ erro: 'Categoria não encontrada.' });
        }
        console.error("Erro ao atualizar produto:", error);

        return res.status(500).json({
            erro: "Erro ao atualizar produto."
        });
    }
}

// Excluir produto
async function apagarProduto(req, res) {
    try {
        const id = Number(req.params.id);

        await prisma.produto.delete({
            where: { id }
        });

        return res.status(204).send();

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }
        console.error("Erro ao excluir produto:", error);

        return res.status(500).json({
            erro: "Erro ao excluir produto."
        });
    }
}

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    apagarProduto
};
