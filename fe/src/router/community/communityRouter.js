import React, { lazy, Suspense, } from 'react'



const communityRouter = () => {
    const Loading = <div>....</div>
    const CommunityList = lazy(()=>import("../../pages/community/CommunityListPage"))
    const CommnunityAdd = lazy(() => import("../../pages/community/CommnunityAddPage"))

    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><CommunityList/></Suspense>,

        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><CommnunityAdd /></Suspense>

        }

    ]
}

export default communityRouter