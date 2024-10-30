// import GymList from '../../components/facilities/gym/GymList';
import GymProgramAdd from '../../components/facilities/gym/GymProgramAdd';
import GymModify from '../../components/facilities/gym/GymModify';
import GymCancel from '../../components/facilities/gym/GymCancel';
import GymPage from '../../pages/facilities/gym/GymPage';
import { Suspense, lazy } from 'react';
// import GymDetailListPage from '../../pages/facilities/gym/GymDetailListPage';

const Loading = <div>....</div>
const GymList = lazy(() => import("../../pages/facilities/gym/GymListPage"))
const GymProgramDetail = lazy(() => import("../../pages/facilities/gym/GymProgramDetailPage"))



const gymRouter = [
    {
        path: "gym",
        element: <GymPage />,
        children: [
            {
                path: "list",
                element: <Suspense fallback={Loading}><GymList /></Suspense>
            },
            {
                path: "add",
                element: <GymProgramAdd />
            },
            {
                path: "detail/:programId",
                element: <Suspense fallback={Loading}><GymProgramDetail /></Suspense>
            },
            {
                path: "modify",
                element: <GymModify />
            },
            {
                path: "cancel",
                element: <GymCancel />
            },
        ]
    },
];


export default gymRouter