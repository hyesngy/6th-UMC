import styled from "styled-components";
import PageContainer from "../styles/PageStyle";
import { useLocation } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';

const DetailBox=styled.div`
    width: 60%;
    min-height: calc(100vh - 5vw);
    display: flex;
    margin: 0 20vw;
`

const Posterimg = styled.img`
    width: 30%;
    height: auto;
    margin: 5vw;
`

const DetailTextdiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5vw 0;
    margin-right: 5vw;
`

const TitleP = styled.p`
    color: white;
    font-weight: bold;
    font-size: 2vw;
`

const RateDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: white;
    font-size: 1.2vw;
`

const ReleaseDateP = styled.p`
    color: white;
    font-size: 1.2vw;
`

const SummaryTitle=styled.p`
    color: white;
    font-weight: bold;
    font-size: 1.2vw;
`

const SummaryP = styled.p`
    color: white;
    font-size: 1vw;
`

const BackgroundDiv = styled.div`
    width: 100%;
    min-height: calc(100vh - 5vw);
    background: rgba(0, 0, 0, 0.7);
`

const MovieDetailPage = () => {
    const location = useLocation();
    const movie = location.state.movie;

    const renderStars = (rating) => {
        const stars = [];
        const starsCount = Math.floor(rating);

        for (let i = 0; i < starsCount; i++) {
            stars.push(<IoIosStar key={i} color="#FFCC15"/>);
        }

        return stars;
    };

    return (
        <PageContainer style={{ 
                justifyContent: "center", 
                backgroundImage: `url(${movie.poster})`, 
                backgroundSize: 'cover' }}
        >
            <BackgroundDiv>
                <DetailBox>
                    <Posterimg src={movie.poster} alt="poster"/>
                        <DetailTextdiv>
                            <TitleP>{movie.title}</TitleP>
                            <RateDiv>평점 {renderStars(movie.rating)}</RateDiv>
                            <ReleaseDateP>개봉일 {movie.release_date} </ReleaseDateP>
                            <SummaryTitle>줄거리</SummaryTitle>
                            <SummaryP>{movie.overview ? movie.overview : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}</SummaryP>
                        </DetailTextdiv>
                </DetailBox>
            </BackgroundDiv>
        </PageContainer>

    )
}

export default MovieDetailPage;