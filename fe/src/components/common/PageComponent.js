import React from 'react'

const PageComponent = ({ serverData, movePage }) => {
    return (
        <div className='flex justify-center'>
            {serverData.prev ?
                <div className='cursor-pointer bg-blue-400 text-white'
                    onClick={() => movePage({ page: serverData.prevPage })}>
                    Prev</div> : <></>
            }
            {serverData.pageNumList.map(pageNum =>
                <div key={pageNum}
                    className={`p-2 text-center text-white cursor-pointer
                            ${serverData.current === pageNum ? 'bg-gray-500' : 'bg-blue-400'}`}
                    onClick={() => movePage({ page: pageNum })}>
                    {pageNum}
                </div>
            )
            }
            {serverData.next ?
                <div className='cursor-pointer bg-blue-400 text-white'
                    onClick={() => movePage({ page: serverData.nextPage })}>
                    Next</div> : <></>
            }
        </div>
    )
}

export default PageComponent