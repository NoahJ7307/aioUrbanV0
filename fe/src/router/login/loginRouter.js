import { lazy, Suspense } from "react"
import Loading from "../../components/common/Loading"

const loginRouter = () => {

    const LoginPage = lazy(() => import("../../components/login/LoginComponent"))
    const FindPw = lazy(() => import("../../components/login/FindPwComponent"))

    return [
        {
            path: "",
            element: <Suspense fallback={<Loading />}><LoginPage /></Suspense>
        },
        {
            path: "findPw",
            element: <Suspense fallback={<Loading />}><FindPw /></Suspense>
        },
    ]
}
export default loginRouter