import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import styled from "styled-components";
import ItemMovie from "../ItemMovie/ItemMovie";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Pagination";
import InfiniteScrollComponent from "../InfiniteScroll";

const ListContainer = styled.div`
    width: 100%;
    align-items: center;
    justify-items: center;
`;

const Container = styled.div`
    width: 80%;
    margin: 0 10%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;

    @media screen and (max-width: 768px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 425px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

const SpinnerContainer = styled.div`
    min-height: calc(100vh - 5vw);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ListMovie = ({ Url, mode }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const accessToken = import.meta.env.VITE_API_ACCESS;

    const fetchMovies = useCallback(async (page) => {
        console.log(`Fetching movies for page: ${page}, mode: ${mode}`);
        setLoading(true);
        const options = {
            method: 'GET',
            url: Url,
            params: { language: 'ko', page: page },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        };

        try {
            const response = await axios.request(options);
            console.log('Fetched movies:', response.data.results); 
            setMovies(prev => mode === 'infinite' ? [...prev, ...response.data.results] : response.data.results);
            setPageCount(response.data.total_pages);
            setHasMore(page < response.data.total_pages);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching movies:', err); 
            setLoading(false);
        }
    }, [Url, mode, accessToken]);

    useEffect(() => {
        fetchMovies(currentPage);
    }, [Url, currentPage, fetchMovies, mode]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    const loadMoreMovies = () => {
        setCurrentPage(prev => prev + 1);
    };

    return (
        <ListContainer>
            {loading && currentPage === 1 ? (
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            ) : (
                <>
                    <Container>
                        {movies.map((item) => (
                            <ItemMovie
                                key={item.id}
                                id={item.id}
                                poster={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                title={item.title}
                                rating={item.vote_average.toFixed(1)}
                                overview={item.overview}
                            />
                        ))}
                    </Container>
                    {mode === 'pagination' ? (
                        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} currentPage={currentPage} />
                    ) : (
                        <InfiniteScrollComponent
                            dataLength={movies.length}
                            next={loadMoreMovies}
                            hasMore={hasMore}
                        >
                            {movies.map((item) => (
                                <ItemMovie
                                    key={item.id}
                                    id={item.id}
                                    poster={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    title={item.title}
                                    rating={item.vote_average.toFixed(1)}
                                    overview={item.overview}
                                />
                            ))}
                        </InfiniteScrollComponent>
                    )}
                </>
            )}
        </ListContainer>
    );
};

export default ListMovie;
