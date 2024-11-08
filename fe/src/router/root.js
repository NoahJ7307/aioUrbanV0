import React, { lazy, Suspense } from 'react'
import userRouter from './user/userRouter'
import facilities from './facilities/facilitiesRouter'
import parkingRouter from './parking/parkingRouter'
import loginRouter from './login/loginRouter'
import communities from './communities/communityRouter'
import mileageRouter from './mileage/mileageRouter';

const { createBrowserRouter } = require("react-router-dom")

const Loading = <div>....</div>
const Main = lazy(() => import("../pages/MainPage"))
const User = lazy(() => import("../pages/user/UserPage"))
const Login = lazy(() => import("../pages/login/LoginPage"))
const Join = lazy(() => import("../pages/JoinPage"))
const Parking = lazy(() => import("../pages/parking/ParkingPage"))
const ChatPage = lazy(() => import("../pages/community/chat/ChatPage"))
const MileagePage= lazy(() => import("../pages/mileage/MileagePage")) ;


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
    {
        path: "mileage",
        element: <Suspense fallback={Loading}><MileagePage /></Suspense>,
        children: mileageRouter()
    },
    ...facilities,
    ...communities,
])

export default root;