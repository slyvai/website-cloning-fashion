import BlogDetails from "@/component/blog/BlogDetails";
export default async function BlogDetail({ params }) {
    const { id } = await params
    return(
        <>

        <BlogDetails id={id} />

        </>
    )
}