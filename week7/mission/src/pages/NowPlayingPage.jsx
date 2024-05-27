import ListMovie from '../components/ListMovie/ListMovie';
import PageContainer from "../styles/PageStyle";

const NowPlayingPage = () => {
    return (
        <PageContainer>
            <ListMovie Url="https://api.themoviedb.org/3/movie/now_playing" mode="infinite"/>
        </PageContainer>
    )
}

export default NowPlayingPage;