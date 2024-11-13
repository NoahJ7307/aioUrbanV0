import { Children, lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const myPageRouter = () => {

    const Loading = <div>....</div>
    const MyInfo = lazy(() => import("../../pages/myPage/MyInfoPage"))
    const Mileage = lazy(() => import("../../pages/myPage/MyMileagePage"))
    const Facilities = lazy(() => import("../../pages/myPage/MyFacilitiesPage"))

    return [
        {
            path: "",
            element: <Navigate replace to="" />
        },
        {
            path: "myInfo",
            element: <Suspense fallback={Loading}><MyInfo /></Suspense>,
        },
        {
            path: "mileage",
            element: <Suspense fallback={Loading}><Mileage /></Suspense>,
        },
        {
            path: "facilities",
            element: <Suspense fallback={Loading}><Facilities /></Suspense>,
        },
    ]
}
export default myPageRouter