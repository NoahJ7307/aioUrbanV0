import GolfPage from '../../pages/facilities/golf/GolfPage';
import GolfListPage from '../../pages/facilities/golf/GolfListPage';
import GolfReservePage from '../../pages/facilities/golf/GolfReservePage';
import GolfModifyPage from '../../pages/facilities/golf/GolfModifyPage';
// import GolfCancelPage from '../../pages/facilities/golf/GolfCancelPage';
import GolfUserListPage from '../../pages/facilities/golf/GolfUserListPage';



const golfRouter = [
    {
        path: "golf",
        element: <GolfPage />,
        children: [
            {
                path: "list",
                element: <GolfListPage/>
            },
            {
                path: "reserve",
                element: <GolfReservePage/>
            },
            {
                path: "userlist/:uno",
                element: <GolfUserListPage/>
            },
            {
                path: "modify",
                element: <GolfModifyPage/>
            },
            // {
            //     path: "cancel",
            //     element: <GolfCancelPage/>
            // },
        ]
    },
];


export default golfRouter