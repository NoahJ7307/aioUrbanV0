import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const parkingRouter = () => {

    const Loading = <div>....</div>
    const Parking = lazy(() => import("../../pages/parking/ParkingPage"))
    const Regular = lazy(() => import("../../pages/parking/RegularPage"))
    const RegularAdd = lazy(() => import("../../pages/parking/RegularAddPage"))
    const RegularModify = lazy(() => import("../../pages/parking/RegularModifyPage"))
    const Visit = lazy(() => import("../../pages/parking/VisitPage"))
    const Entry = lazy(() => import("../../pages/parking/EntryPage"))

    return [
        {
            path: "",
            element: <Navigate replace to="/parking" />
        },
        {
            path: "",
            element: <Suspense fallback={Loading}><Parking /></Suspense>
        },
        {
            path: "regular",
            element: <Suspense fallback={Loading}><Regular /></Suspense>,
        },
        {
            path: "regular/add",
            element: <Suspense fallback={Loading}><RegularAdd /></Suspense>,
        },
        {
            path: "regular/modify/:rpno",
            element: <Suspense fallback={Loading}><RegularModify /></Suspense>,
        },
        {
            path: "visit",
            element: <Suspense fallback={Loading}><Visit /></Suspense>
        },
        {
            path: "entry",
            element: <Suspense fallback={Loading}><Entry /></Suspense>
        },
    ]
}
export default parkingRouter