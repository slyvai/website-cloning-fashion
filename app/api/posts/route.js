import posts from '../../data/blog.json'

export const GET = async () => {
    return Response.json(posts)
}