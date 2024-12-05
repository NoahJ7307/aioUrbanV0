import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../css/public/public.css';

const PageComponent = ({ serverData, movePage }) => {
    // Ensure that pageNumList is always an array
    const pageNumList = Array.isArray(serverData.pageNumList) ? serverData.pageNumList : [];

    return (
        <div className="pagination">
            {serverData.prev ? (
                <div className="paginationButton" onClick={() => movePage({ page: serverData.prevPage })}>
                    <ArrowBackIosNewIcon />
                </div>
            ) : null}

            {pageNumList.map(pageNum => (
                <div
                    key={pageNum}
                    className={`paginationButton ${serverData.current === pageNum && 'active'}`}
                    onClick={() => movePage({ page: pageNum })}
                >
                    {pageNum}
                </div>
            ))}

            {serverData.next ? (
                <div className="paginationButton" onClick={() => movePage({ page: serverData.nextPage })}>
                    <ArrowForwardIosIcon />
                </div>
            ) : null}
        </div>
    );
};

export default PageComponent;
