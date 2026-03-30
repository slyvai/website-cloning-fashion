import Details from '@/component/shop/Details'
export default async function Home({ params }) {
    const {id} = await params
    return (
        <>
            <Details id={id} />
        </>
    )
}