import React, { lazy, Suspense } from 'react'
import userRouter from './user/userRouter'
import facilities from './facilities/facilitiesRouter'
import parkingRouter from './parking/parkingRouter'
import loginRouter from './loginRouter'
import communities from './communities/communityRouter'

const { createBrowserRouter } = require("react-router-dom")

const Loading = <div>....</div>
const Main = lazy(() => import("../pages/MainPage"))
const User = lazy(() => import("../pages/user/UserPage"))
const Login = lazy(() => import("../pages/login/LoginPage"))
const Join = lazy(() => import("../pages/JoinPage"))
const Parking = lazy(() => import("../pages/parking/ParkingPage"))


const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "join",
        element: <Suspense fallback={Loading}><Join /></Suspense>,
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
    {
        path: "parking",
        element: <Suspense fallback={Loading}><Parking /></Suspense>,
        children: parkingRouter()
    },
    ...facilities,
    ...communities,
])

export default root;