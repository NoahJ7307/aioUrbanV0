import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const parkingRouter = () => {

    const Loading = <div>....</div>
    const Parking = lazy(() => import("../pages/parking/ParkingPage"))
    const Regular = lazy(() => import("../pages/parking/RegularPage"))
    const Visit = lazy(() => import("../pages/parking/VisitPage"))
    const Entry = lazy(() => import("../pages/parking/EntryPage"))

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
            element: <Suspense fallback={Loading}><Regular /></Suspense>
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