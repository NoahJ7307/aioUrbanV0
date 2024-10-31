import GymList from '../../components/facilities/gym/GymList';
import GymReserve from '../../components/facilities/gym/GymReserve';
import GymModify from '../../components/facilities/gym/GymModify';
import GymCancel from '../../components/facilities/gym/GymCancel';
import GymPage from '../../pages/facilities/gym/GymPage';
import AnnounceListPage from '../../pages/community/announce/AnnounceListPage';
import AnnouncePage from '../../pages/community/announce/AnnouncePage';
import AnnounceAddPage from '../../pages/community/announce/AnnounceAddPage';
import AnnounceModifyPage from '../../pages/community/announce/AnnounceModifyPage';



const announceRouter = [
    {
        path: "announce",
        element: <AnnouncePage />,
        children: [
            {
                path: "list",
                element: <AnnounceListPage />
            },
            {
                path: "add",
                element: <AnnounceAddPage />
            },
            {
                path: "modify/:pno",
                element: <AnnounceModifyPage />
            },
            {
                path: "cancel",
                element: <GymCancel />
            },
        ]
    },
];


export default announceRouter