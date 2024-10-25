import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const RegularRouter = () => {

    const Loading = <div>....</div>
    const RegularList = lazy(() => import("../../../pages/parking/RegularPage"))
    const RegularAdd = lazy(() => import("../../../pages/parking/RegularAddPage"))

    return [
        {
            path: "",
            element: <Navigate replace to="/parking/regular" />
        },
        {
            path: "",
            element: <Suspense fallback={Loading}><RegularList /></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><RegularAdd /></Suspense>
        },
    ]
}
export default RegularRouter