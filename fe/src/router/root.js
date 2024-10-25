import React, { lazy, Suspense } from 'react'
import userRouter from './user/userRouter'
import communityRouter from './community/communityRouter'
import loginRouter from './login/loginRouter'
import facilities from './facilities/facilitiesRouter'
import parkingRouter from './parking/parkingRouter'

const { createBrowserRouter } = require("react-router-dom")

const Loading = <div>....</div>
const Main = lazy(() => import("../pages/MainPage"))
const User = lazy(() => import("../pages/user/UserPage"))
const Login = lazy(() => import("../pages/login/LoginPage"))
const Community = lazy(() => import("../pages/community/CommunityPage"))
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
        path: "community",
        element: <Suspense fallback={Loading}><Community /></Suspense>,
        children: communityRouter()
        // 커뮤니티 추가
    },
    {
        path: "parking",
        element: <Suspense fallback={Loading}><Parking /></Suspense>,
        children: parkingRouter()
    },
    ...facilities,
])

export default root;