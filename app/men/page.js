import ManPage from "@/component/men/ManPage"
import {Suspense} from "react";
export default function Home() {
    return (
        <Suspense fallback={null}>
            <ManPage />
        </Suspense>
    )
}