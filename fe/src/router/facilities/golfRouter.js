import Loading from '../../components/common/Loading';
import GolfPage from '../../pages/facilities/golf/GolfPage';
// import GolfModifyPage from '../../pages/facilities/golf/GolfModifyPage';
import { Suspense, lazy } from 'react';

const GolfList = lazy(() => import("../../pages/facilities/golf/GolfListPage"))
const GolfModify = lazy(() => import("../../pages/facilities/golf/GolfModifyPage"))
const GolfReserve = lazy(() => import("../../pages/facilities/golf/GolfReservePage"))

const golfRouter = [
    {
        path: "golf",
        element: <GolfPage />,
        children: [
            {
                path: "list",
                element: <Suspense fallback={<Loading />}><GolfList /></Suspense>
            },
            {
                path: "reserve",
                element: <Suspense fallback={<Loading />}><GolfReserve /></Suspense>
            },
            {
                path: "detail/:uno",
                element: <Suspense fallback={<Loading />}><GolfModify /></Suspense>
            },

        ]
    },
];


export default golfRouter