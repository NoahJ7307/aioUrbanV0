import GymPage from '../../pages/facilities/gym/GymPage';
import { Suspense, lazy } from 'react';
import Loading from '../../components/common/Loading';

const GymList = lazy(() => import("../../pages/facilities/gym/GymListPage"))
const GymProgramDetail = lazy(() => import("../../pages/facilities/gym/GymProgramDetailPage"))
const GymProgramAdd = lazy(() => import("../../pages/facilities/gym/GymProgramAddPage"))
const GymModify = lazy(() => import("../../pages/facilities/gym/GymModifyPage"))
const MembershipPurchasePage = lazy(() => import("../../pages/facilities/gym/membership/MembershipPurchasePage"))
const AdminCreateMembershipPage = lazy(() => import("../../pages/facilities/gym/membership/AdminCreateMembershipPage"))

const gymRouter = [
    {
        path: "gym",
        element: <GymPage />,
        children: [
            {
                path: "list",
                element: <Suspense fallback={<Loading />}><GymList /></Suspense>
            },
            {
                path: "add",
                element: <Suspense fallback={<Loading />}><GymProgramAdd /></Suspense>
            },
            {
                path: "detail/:programId",
                element: <Suspense fallback={<Loading />}><GymProgramDetail /></Suspense>
            },
            {
                path: "detail/modify/:programId",
                element: <Suspense fallback={<Loading />}><GymModify /></Suspense>
            },
            {
                path: "membership",
                element: <Suspense fallback={<Loading />}><MembershipPurchasePage /></Suspense>
            },
          
            {
                path: "membership/create",
                element: <Suspense fallback={<Loading />}><AdminCreateMembershipPage /></Suspense>
            }
         
        ]
    },
];


export default gymRouter