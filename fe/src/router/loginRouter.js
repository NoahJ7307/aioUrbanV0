import { lazy, Suspense } from "react"

const loginRouter = () => {

    const Loading = <div>....</div>
    const LoginPage = lazy(() => import("../pages/login/LoginPage"))

    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><LoginPage /></Suspense>
        },
    ]
}
export default loginRouter