import React, { useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import { IoSearchCircle } from "react-icons/io5";
import ItemMovie from "../components/ItemMovie/ItemMovie";

const Banner = styled.div`
    width: 100%;
    height: 35vh;
    display: flex;
    background: black;
    color:white;
    justify-content:center;
    align-items: center;
    font-weight: bold;
    font-size: 2vw;
`
const FindMoviediv = styled.div`
    width:100%;
    height: 60vh;
    display: flex;
    background: #232649;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const Searchdiv = styled.div`
    width:100%;
    display: flex;
    justify-content:center;
    align-items: center;
`
const Titlep = styled.p`
    color: white;
    font-weight: bold;
    font-size: 2vw;
`
const SearchInput = styled.input`
    width: 20vw;
    height: 2.5vw;
    padding: 0 1vw;
    background: white;
    color: black;
    border: none;
    border-radius: 50px;
    font-size: 1vw;
`

const ResultContainer = styled.div`
    width: 70%;
    min-height: 30vh;
    background: black;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto;
    margin: 1rem auto;

    /* 스크롤바 */
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: #FFCC15;
    }
`

const MainPage = () => {
    const accessToken = import.meta.env.VITE_API_ACCESS;
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {include_adult: 'false', page: '1', query: search},
        headers: { accept: 'application/json', Authorization: `Bearer ${accessToken}`}
        };
        
        axios
        .request(options)
        .then(function (response) {
            setResults(response.data.results);
            console.log(response.data.results);
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    return (
        <>
            <Banner>환영합니다</Banner>
            <FindMoviediv>
            <Titlep>Find your movies!</Titlep>
            <Searchdiv>
                <SearchInput 
                    type="text" 
                    value={search}  
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IoSearchCircle size="40" color="yellow" onClick={handleSearch}/>
            </Searchdiv>

            {results.length > 0 && (
                <ResultContainer>
                    {results.map(movie => (
                        <ItemMovie 
                            key={movie.id}
                            id={movie.id}
                            poster={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            title={movie.title}
                            rating={movie.vote_average}
                            overview={movie.overview}
                        />
                ))}
                </ResultContainer>
            )}
         </FindMoviediv>
        </>
    )
}
export default MainPage;