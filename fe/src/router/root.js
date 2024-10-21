import React, { lazy, Suspense } from 'react'
import userRouter from './userRouter'
import loginRouter from './loginRouter'

const { createBrowserRouter } = require("react-router-dom")

const Loading = <div>....</div>
const Main = lazy(() => import("../pages/MainPage"))
const User = lazy(() => import("../pages/user/UserPage"))
const Login = lazy(() => import("../pages/login/LoginPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "user",
        element: <Suspense fallback={Loading}><User /></Suspense>,
        children: userRouter()
    },
    {
        path: "login",
        element: <Suspense fallback={Loading}><Login /></Suspense>,
        children: loginRouter()
    },
])

export default root;