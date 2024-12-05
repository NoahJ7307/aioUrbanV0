import { Suspense, lazy } from 'react';
import Loading from '../../components/common/Loading';

const StudyPage = lazy(() => import("../../pages/facilities/study/StudyPage"))
const StudyList = lazy(() => import("../../pages/facilities/study/StudyListPage"))
const StudyModify = lazy(() => import("../../pages/facilities/study/StudyModifyPage"))
const StudyReserve = lazy(() => import("../../pages/facilities/study/StudyReservePage"))


const studyRouter = [
    {
        path: "study",
        element: <Suspense fallback={<Loading />}><StudyPage /></Suspense>,
        children: [
            {
                path: "list",
                element: <Suspense fallback={<Loading />}><StudyList /></Suspense>
            },
            {
                path: "reserve",
                element: <Suspense fallback={<Loading />}><StudyReserve /></Suspense>

            },
            {
                path: "detail/:uno",
                element: <Suspense fallback={<Loading />}><StudyModify /></Suspense>
            },

        ]
    },
];


export default studyRouter