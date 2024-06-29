import React from "react";
import ReactPaginate from "react-paginate";
import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    color: white;

    .pagination {
        display: flex;
        list-style: none;
        padding: 0;
    }

    .pagination__link {
        padding: 0.5rem 0.75rem;
        margin: 0 0.25rem;
        cursor: pointer;
        color: white;
        text-decoration: none;
    }

    .pagination__link__active {
        font-weight: bold;
        color: yellow;
    }

    .pagination__link:hover {
        text-decoration: underline;
    }

    .pagination__link__disabled {
        color: gray;  
        cursor: not-allowed;
    }

    .pagination__previous,
    .pagination__next {
        margin: 0 1rem; 
    }

`;

const Pagination = ({ pageCount, handlePageClick, currentPage }) => {
    const handlePageChange = (event) => {
        handlePageClick(event);
        window.scrollTo(0,0);
    };

    return (
        <PaginationContainer>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={null}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                forcePage={currentPage - 1}
                pageRangeDisplayed={currentPage === 1 ? 0 : 1}
                marginPagesDisplayed={0}
                containerClassName={"pagination"}
                pageLinkClassName={"pagination__link"}
                previousLinkClassName={`pagination__link ${currentPage === 1 ? "pagination__link__disabled" : ""} pagination__previous`}
                nextLinkClassName={`pagination__link ${currentPage === pageCount ? "pagination__link__disabled" : ""} pagination__next`}
                activeLinkClassName={"pagination__link__active"}
                disabledClassName={"pagination__link__disabled"} 
            />
        </PaginationContainer>
    );
};

export default Pagination;
