import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"
import MileagePage from "../../pages/mileage/MileagePage"
const mileageRouter = () => {

    const Loading = <div>....</div>
    //const Parking = lazy(() => import("../../pages/mileagePage"))
    

    return [
        {
            path: "",
            element: <Navigate replace to="/mileage" />
        },
        {
            path: "",
            element: <Suspense fallback={Loading}><MileagePage /></Suspense>
        },

    ]
}
export default mileageRouter;