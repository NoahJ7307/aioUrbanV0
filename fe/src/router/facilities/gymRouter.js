import GymList from '../../components/facilities/gym/GymList';
import GymReserve from '../../components/facilities/gym/GymReserve';
import GymModify from '../../components/facilities/gym/GymModify';
import GymCancel from '../../components/facilities/gym/GymCancel';
import GymPage from '../../pages/facilities/gym/GymPage';



const gymRouter = [
    {
        path: "gym",
        element: <GymPage />,
        children: [
            {
                path: "list",
                element: <GymList/>
            },
            {
                path: "reserve",
                element: <GymReserve/>
            },
            {
                path: "modify",
                element: <GymModify/>
            },
            {
                path: "cancel",
                element: <GymCancel/>
            },
        ]
    },
];


export default gymRouter