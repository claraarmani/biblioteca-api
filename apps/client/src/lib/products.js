const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
function slugify(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
function mapProduct(item) {
    return {
        id: String(item.id),
        slug: slugify(item.nome) + '-' + item.id,
        name: item.nome,
        gender: item.genero,
        category: item.categoria?.nome || 'Outros',
        price: Number(item.preco),
        colors: [{
                name: item.cor || 'Única',
                hex: '#888888',
            }],
        sizes: item.tamanho
            ? item.tamanho.split(',').map(s => s.trim())
            : [],
        image: item.imagem || (item.genero === 'mulher'
            ? '/images/products/w-blazer.png'
            : '/images/products/m-tee.png'),
        description: item.descricao || '',
        details: [`Estoque disponível: ${item.estoque}`],
        isNew: false,
    };
}
export async function getAllProducts() {
    const response = await fetch(`${API_URL}/produtos`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error('Erro ao buscar produtos na API');
    }
    const data = await response.json();
    return data.map(mapProduct);
}
export async function getProductsByGender(gender) {
    const allProducts = await getAllProducts();
    return allProducts.filter(product => product.gender === gender);
}
export async function getCategories(gender) {
    const products = await getProductsByGender(gender);
    return Array.from(new Set(products.map(product => product.category)));
}
export async function getProductById(id) {
    const products = await getAllProducts();
    return products.find(product => product.id === id);
}
export async function getProductBySlug(slug) {
    const products = await getAllProducts();
    return products.find(product => product.slug === slug);
}
export async function getRelatedProducts(product, limit = 4) {
    const products = await getAllProducts();
    return products
        .filter(item => item.gender === product.gender &&
        item.id !== product.id)
        .slice(0, limit);
}
export async function searchProducts(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized)
        return [];
    const products = await getAllProducts();
    return products.filter(product => product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized));
}
