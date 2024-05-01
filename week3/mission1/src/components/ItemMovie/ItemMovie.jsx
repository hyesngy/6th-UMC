import React, { useState } from "react";
import styled from "styled-components";
import { IoIosStar } from "react-icons/io";

const MovieBox = styled.div`
    width: 90%;
    margin: 1vw 0.5vw;
    position: relative;
    cursor: pointer;
`

const Poster = styled.img`
    width: 100%;
    height: 15vw;
    border-radius: 10px 10px 0px 0px;
`

const MovieBoxBottom = styled.div`
    width: 100%;
    height: 3.5vw;
    
    background-color: #383B67;
    display: flex;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;
`

const SubTitle = styled.p`
    font-size: 0.6vw;
    color: #FFFFFF;
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
`;

const OverTitle = styled.p`
    padding: 0.5vw;
    font-size: 0.6vw;
`;

const OverView = styled.p`
    padding: 0.5vw;
    padding-right: 0.5vw;
`;

const ItemMovie = ({id, poster, title, rating, overview}) => {
    const handleMouseOver = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'block';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'none';
    };

    return (
        <MovieBox key={id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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