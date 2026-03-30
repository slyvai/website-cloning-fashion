import products from '../../../data/products.json'

export async function GET(request, { params }) {
    const {id} = await params
    const product = products.find(p => p.id === Number(id))

    return Response.json(product)
}