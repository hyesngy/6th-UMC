import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import ItemMovie from "../ItemMovie/ItemMovie";
import Spinner from "../Spinner/Spinner";

const ListContainer = styled.div`
    width:100%;    
    align-items: center;
    justify-items: center;
`;

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
`;

const SpinnerContainer = styled.div`
    min-height: calc(100vh - 5vw);
    display: flex;
    align-items: center; 
    justify-content: center;
`;

const ListMovie = ({ Url }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = import.meta.env.VITE_API_ACCESS;

    useEffect(() => {
        const options = {
            method: 'GET',
            url: Url,
            params: { language: 'ko' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        };

        axios.request(options)
            .then(response => {
                setMovies(response.data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [Url]);

    return (
        <ListContainer>
            {loading ? (
                <SpinnerContainer>
                    <Spinner loading={loading}/>
                </SpinnerContainer>
            ) : (
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
            )}
        </ListContainer>
    );
};

export default ListMovie;