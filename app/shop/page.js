import ShopPages from '@/component/shop/ShopPages'
import { Suspense } from 'react'

export default function Home() {
    return (
        <Suspense fallback={null}>
            <ShopPages />
        </Suspense>
    )

}