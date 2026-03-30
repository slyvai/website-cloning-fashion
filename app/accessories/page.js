import Accessories from "@/component/accessories/Accessories";
import {Suspense} from "react";
export default function Home() {
    return (
        <Suspense fallback={null}>
            <Accessories />
        </Suspense>
    )
}