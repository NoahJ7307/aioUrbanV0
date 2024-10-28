import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const RegularRouter = () => {

    const Loading = <div>....</div>
    const RegularList = lazy(() => import("../../../pages/parking/RegularPage"))

    return [
        {
            path: "",
            element: <Navigate replace to="/parking/regular" />
        },
        {
            path: "",
            element: <Suspense fallback={Loading}><RegularList /></Suspense>
        },
    ]
}
export default RegularRouter