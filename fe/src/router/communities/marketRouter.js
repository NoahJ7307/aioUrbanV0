

import MarketListPage from '../../pages/community/market/MarketListPage';
import MarketPage from '../../pages/community/market/MarketPage';
import MarketAddPage from '../../pages/community/market/MarketAddPage';




const marketRouter = [
    {
        path: "market",
        element: <MarketPage />,
        children: [
            {
                path: "list",
                element: <MarketListPage />
            },
            {
                path: "add",
                element: <MarketAddPage />
            },
        ]
    },
];


export default marketRouter