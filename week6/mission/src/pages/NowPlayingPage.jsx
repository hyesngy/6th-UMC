import ListMovie from '../components/ListMovie/ListMovie';
import PageContainer from "../styles/PageStyle";

const NowPlayingPage = () => {
    return (
        <PageContainer>
            <ListMovie Url="https://api.themoviedb.org/3/movie/now_playing"/>
        </PageContainer>
    )
}

export default NowPlayingPage;