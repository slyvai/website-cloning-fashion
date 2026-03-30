import { Suspense } from 'react'
import WomanPage from "@/component/women/WomanPage"

export default function Home() {
    return (
        <Suspense fallback={null}>
            <WomanPage />
        </Suspense>
    )
}