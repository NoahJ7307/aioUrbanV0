import InfoMainComponents from '../../components/community/info/InfoMainComponents';
import InfoMainPage from '../../pages/community/info/InfoMainPage';
import InfoPage from '../../pages/community/info/InfoPage';



const infoRouter = [
    {
        path: "info",
        element: <InfoPage />,
        children: [
            {
                path: "jobs",
                element: <InfoMainPage />
            },
        ]
    },
];


export default infoRouter