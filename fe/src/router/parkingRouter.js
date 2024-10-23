import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const parkingRouter = () => {

    const Loading = <div>....</div>
    const ParkingPage = lazy(() => import("../pages/parking/ParkingPage"))

    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><ParkingPage /></Suspense>
        },
        {
            path: "",
            element: <Navigate replace to="/" />
        },
    ]
}
export default parkingRouter