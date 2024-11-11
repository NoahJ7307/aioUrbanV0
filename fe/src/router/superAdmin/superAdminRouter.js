import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const userRouter = () => {

    const Loading = <div>....</div>

    return [
        {
            path: "",
            element: <Navigate replace to="" />
        },
    ]
}
export default userRouter