import products from '../../data/products.json'

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const category = searchParams.get('category')
    if (category) {
        const filtered = products.filter(p => p.category === category)
        return Response.json(filtered)
    }

    return Response.json(products)
}