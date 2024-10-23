import React, { lazy, Suspense, } from 'react'



const communityRouter = () => {
    const Loading = <div>....</div>
    const CommunityList = lazy(() => import("../../pages/community/CommunityListPage"))
    const CommnunityAdd = lazy(() => import("../../pages/community/CommnunityAddPage"))
    const CommnunityModifyPage = lazy(() => import("../../pages/community/CommnunityModifyPage"))
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><CommunityList /></Suspense>,

        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><CommnunityAdd /></Suspense>

        },

        {
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><CommnunityModifyPage /></Suspense>

        }


    ]
}

export default communityRouter