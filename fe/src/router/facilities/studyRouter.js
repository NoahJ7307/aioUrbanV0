import StudyList from '../../components/facilities/study/StudyList';
import StudyReserve from '../../components/facilities/study/StudyReserve';
import StudyModify from '../../components/facilities/study/StudyModify';
import StudyCancel from '../../components/facilities/study/StudyCancel';
import StudyPage from '../../pages/facilities/study/StudyPage';



const studyRouter = [
    {
        path: "study",
        element: <StudyPage />,
        children: [
            {
                path: "list",
                element: <StudyList/>
            },
            {
                path: "reserve",
                element: <StudyReserve/>
            },
            {
                path: "modify",
                element: <StudyModify/>
            },
            {
                path: "cancel",
                element: <StudyCancel/>
            },
        ]
    },
];


export default studyRouter