import GymList from '../../components/facilities/gym/GymList';
import GymReserve from '../../components/facilities/gym/GymReserve';
import GymModify from '../../components/facilities/gym/GymModify';
import GymCancel from '../../components/facilities/gym/GymCancel';

import InfoPage from '../../pages/community/info/InfoPage';



const infoRouter = [
    {
        path: "info",
        element: <InfoPage />,
        children: [
    
        ]
    },
];


export default infoRouter