import { Suspense } from 'react'
import TrackOrder from "@/component/track-order/TrackOrder";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackOrder />
        </Suspense>
    )
}