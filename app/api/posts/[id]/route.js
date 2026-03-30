import post from '../../../data/blog.json'

export async function GET(request, { params }) {
    const {id} = await params
    const posts = post.find(p => p.id === Number(id))

    return Response.json(posts)
}