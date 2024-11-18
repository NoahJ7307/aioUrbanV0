import React from 'react'
import '../../css/public/public.css'

const PageComponent = ({ serverData, movePage }) => {
    return (
        <div className="pagination">
            {serverData.prev ?
                <div className='paginationButton'
                    onClick={() => movePage({ page: serverData.prevPage })}>
                    Prev</div> : <></>
            }
            {serverData.pageNumList.map(pageNum =>
                <div key={pageNum}
                    className={`paginationButton
                            ${serverData.current === pageNum ? 'active' : ''}`}
                    onClick={() => movePage({ page: pageNum })}>
                    {pageNum}
                </div>
            )
            }
            {serverData.next ?
                <div className='paginationButton'
                    onClick={() => movePage({ page: serverData.nextPage })}>
                    Next</div> : <></>
            }
        </div>
    )
}

export default PageComponent