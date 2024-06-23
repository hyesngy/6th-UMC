import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";

const MovieBox = styled.div`
    width: 90%;
    margin: 1vw 0.5vw;
    position: relative;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        margin: 1vw auto;
    }
`

const Poster = styled.img`
    width: 100%;
    height: 20vw;
    border-radius: 10px 10px 0 0;

    @media screen and (max-width: 768px){
        width: 90%;
        margin: 0px 5%;
        margin-top: 5%;
        height: 30vw;
    }

    @media screen and (max-width: 425px){
        width: 60%;
        margin: 0px 20%;
        margin-top: 5%;
        height: 50vw;
    }
`

const MovieBoxBottom = styled.div`
    width: 100%;
    height: 3.5vw;
    background-color: #383B67;
    display: flex;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;

    @media screen and (max-width: 768px){
        width: 90%;
        height: 5vw;
        margin: 0px 5%;
    }

    @media screen and (max-width: 425px){
        width: 60%;
        height: 6vw;
        margin: 0px 20%;
    }
`

const SubTitle = styled.p`
    font-size: 0.6vw;
    color: #FFFFFF;

    @media screen and (max-width: 768px){
        width: 90%;
        font-size: 1.2vw;
    }

    @media screen and (max-width: 425px){
        font-size: 2vw;
    }
`

const OverExplain = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.8;
    color: white;
    font-size: 0.5vw;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: none;
    border-radius: 10px;

    @media screen and (max-width: 768px){
        width: 90%;
        font-size: 1vw;
    }

    @media screen and (max-width: 425px){
        font-size: 1.5vw;
    }
`;

const OverTitle = styled.p`
    padding: 0.5vw;
    font-size: 0.6vw;

    @media screen and (max-width: 768px){
        font-size: 1.2vw;
        padding: 1vw;
    }

    @media screen and (max-width: 425px){
        font-size: 2vw;
        padding: 1.5vw;
    }
`;

const OverView = styled.p`
    padding: 0.5vw;
    padding-right: 0.5vw;

    @media screen and (max-width: 768px){
        padding: 1vw;
    }

    @media screen and (max-width: 425px){
        padding: 1.5vw;
    }
`;

const ItemMovie = ({id, poster, title, rating, overview, release_date}) => {
    const navigate = useNavigate();

    const handleMouseOver = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'block';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'none';
    };

    const handleClick = () => {
        navigate(`/movie/${id}`, { state: { movie: { id, poster, title, rating, overview, release_date } } });
    };

    return (
        <MovieBox 
            key={id} 
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut} 
            onClick={handleClick}
        >
            <Poster src={poster} alt="poster"/>
            <MovieBoxBottom>
                <div className="titleBox" style={{display: "flex", justifyContent: "space-between", alignItems:"flex-start", width: "90%"}}>
                    <SubTitle style={{width: "70%"}}>{title}</SubTitle>
                    
                    <div className="rating" style={{display: "flex", alignItems: "center", gap: "0.2vw"}}>
                        <IoIosStar size='10' color='yellow'/>
                        <SubTitle>{rating}</SubTitle>
                    </div>
                </div>
            </MovieBoxBottom>

            <OverExplain className="overExplain">
                <OverTitle>{title}</OverTitle>
                <OverView>{overview}</OverView>
            </OverExplain>
        </MovieBox>
    );
};

export default ItemMovie;