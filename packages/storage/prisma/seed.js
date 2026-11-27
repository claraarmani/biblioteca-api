const { prisma } = require('../src');

const produtos = [
    {
        nome: 'Jaqueta bomber',
        categoria: 'Jaquetas',
        genero: 'homem',
        imagem: '/images/products/m-bomber.png',
        descricao: 'Jaqueta bomber com fechamento frontal e punhos ajustados.',
        preco: 249.9,
        tamanho: 'P, M, G, GG',
        cor: 'Verde oliva',
        estoque: 14,
    },
    {
        nome: 'Sobretudo masculino',
        categoria: 'Casacos',
        genero: 'homem',
        imagem: '/images/products/m-coat.png',
        descricao: 'Sobretudo de corte reto para sobreposições em dias frios.',
        preco: 399.9,
        tamanho: 'P, M, G, GG',
        cor: 'Preto',
        estoque: 8,
    },
    {
        nome: 'Moletom com capuz',
        categoria: 'Moletons',
        genero: 'homem',
        imagem: '/images/products/m-hoodie.png',
        descricao: 'Moletom de modelagem casual com capuz e bolso frontal.',
        preco: 169.9,
        tamanho: 'P, M, G, GG',
        cor: 'Cinza',
        estoque: 21,
    },
    {
        nome: 'Jeans reto masculino',
        categoria: 'Calças',
        genero: 'homem',
        imagem: '/images/products/m-jeans.png',
        descricao: 'Calça jeans com corte reto e cinco bolsos.',
        preco: 189.9,
        tamanho: '38, 40, 42, 44, 46',
        cor: 'Azul',
        estoque: 18,
    },
    {
        nome: 'Camisa de manga longa',
        categoria: 'Camisas',
        genero: 'homem',
        imagem: '/images/products/m-shirt.png',
        descricao: 'Camisa de manga longa com gola clássica e botões frontais.',
        preco: 149.9,
        tamanho: 'P, M, G, GG',
        cor: 'Branco',
        estoque: 16,
    },
    {
        nome: 'Camiseta básica',
        categoria: 'Camisetas',
        genero: 'homem',
        imagem: '/images/products/m-tee.png',
        descricao: 'Camiseta de gola redonda e modelagem reta para o dia a dia.',
        preco: 69.9,
        tamanho: 'P, M, G, GG',
        cor: 'Branco',
        estoque: 30,
    },
    {
        nome: 'Blazer feminino',
        categoria: 'Blazers',
        genero: 'mulher',
        imagem: '/images/products/w-blazer.png',
        descricao: 'Blazer de alfaiataria com lapela e corte estruturado.',
        preco: 279.9,
        tamanho: 'P, M, G',
        cor: 'Preto',
        estoque: 12,
    },
    {
        nome: 'Vestido midi',
        categoria: 'Vestidos',
        genero: 'mulher',
        imagem: '/images/products/w-dress.png',
        descricao: 'Vestido de comprimento midi para composições casuais ou formais.',
        preco: 219.9,
        tamanho: 'P, M, G',
        cor: 'Preto',
        estoque: 11,
    },
    {
        nome: 'Jeans feminino de cintura alta',
        categoria: 'Calças',
        genero: 'mulher',
        imagem: '/images/products/w-jeans.png',
        descricao: 'Calça jeans de cintura alta com perna reta.',
        preco: 189.9,
        tamanho: '36, 38, 40, 42, 44',
        cor: 'Azul',
        estoque: 19,
    },
    {
        nome: 'Suéter de tricô',
        categoria: 'Tricôs',
        genero: 'mulher',
        imagem: '/images/products/w-knit.png',
        descricao: 'Suéter de tricô para usar sozinho ou em sobreposição.',
        preco: 159.9,
        tamanho: 'P, M, G',
        cor: 'Bege',
        estoque: 15,
    },
    {
        nome: 'Jaqueta feminina de couro',
        categoria: 'Jaquetas',
        genero: 'mulher',
        imagem: '/images/products/w-leather.png',
        descricao: 'Jaqueta com zíper frontal e modelagem ajustada.',
        preco: 329.9,
        tamanho: 'P, M, G',
        cor: 'Preto',
        estoque: 9,
    },
    {
        nome: 'Trench coat feminino',
        categoria: 'Casacos',
        genero: 'mulher',
        imagem: '/images/products/w-trench.png',
        descricao: 'Casaco alongado com faixa na cintura e abotoamento frontal.',
        preco: 379.9,
        tamanho: 'P, M, G',
        cor: 'Bege',
        estoque: 10,
    },
];

async function main() {
    const inseridos = await prisma.$transaction(async (tx) => {
        // Serializa as execuções do seed sem exigir uma restrição única para imagens.
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(631027, 1)`;

        const existentes = await tx.produto.findMany({
            where: { imagem: { in: produtos.map(({ imagem }) => imagem) } },
            select: { imagem: true },
        });
        const imagensCadastradas = new Set(existentes.map(({ imagem }) => imagem));
        const novosProdutos = produtos.filter(({ imagem }) => !imagensCadastradas.has(imagem));
        const categorias = new Map();

        for (const nome of new Set(novosProdutos.map(({ categoria }) => categoria))) {
            const categoria = await tx.categoria.upsert({
                where: { nome },
                create: { nome },
                update: {},
            });
            categorias.set(nome, categoria.id);
        }

        if (novosProdutos.length === 0) return 0;

        const { count } = await tx.produto.createMany({
            data: novosProdutos.map(({ categoria, ...produto }) => ({
                ...produto,
                categoriaId: categorias.get(categoria),
            })),
        });

        return count;
    });

    console.log(`Produtos inseridos: ${inseridos} de ${produtos.length} exemplos.`);
}

main()
    .finally(() => prisma.$disconnect())
    .catch((erro) => {
        console.error('Erro ao popular o catálogo:', erro);
        process.exitCode = 1;
    });
